// REQUERINDO MÓDULOS
const moment = require("moment-timezone");
moment.tz.setDefault('America/Sao_Paulo');
require('dotenv').config();
const { create, Client } = require('@open-wa/wa-automate');
const { criarArquivosNecessarios, criarTexto, consoleErro, corTexto } = require('./lib/util');
const { verificacaoListaNegraGeral } = require(`./lib/listaNegra`);
const { atualizarParticipantes } = require("./lib/controleParticipantes");
const config = require('./config');
const checagemMensagem = require("./lib/checagemMensagem");
const chamadaComando = require("./lib/chamadaComando");
const msgs_texto = require("./lib/msgs");
const recarregarContagem = require("./lib/recarregarContagem");
const { botStart } = require('./lib/bot');
const { verificarEnv } = require('./lib/env');
const cron = require('node-cron');
const { callSimSimi } = require('./lib/api');

create(config(true), { ...start, restartOnCrash: true })
  .then(client => start(client))
  .catch((error) => { consoleErro(error, 'OPEN-WA'); });

async function start(client) {
  try {
    // VERIFICA SE É NECESSÁRIO CRIAR ALGUM TIPO DE ARQUIVO NECESSÁRIO
    let necessitaCriar = await criarArquivosNecessarios();
    if (necessitaCriar) {
      console.log(corTexto(msgs_texto.inicio.arquivos_criados));
      setTimeout(() => {
        return client.kill();
      }, 5000);
    } else {
      const eventosGrupo = require('./lib/eventosGrupo');
      const antiLink = require('./lib/antiLink');
      const antiFlood = require('./lib/antiFlood');
      const antiTrava = require('./lib/antiTrava');
      const antiPorno = require('./lib/antiPorno');
      const cadastrarGrupo = require('./lib/cadastrarGrupo');

      // Cadastro de grupos
      console.log(corTexto(await cadastrarGrupo("", "inicio", client)));
      // Verificar lista negra dos grupos
      //console.log(corTexto(await verificacaoListaNegraGeral(client)));
      // Atualização dos participantes dos grupos
      console.log(corTexto(await atualizarParticipantes(client)));
      // Atualização da contagem de mensagens
      console.log(corTexto(await recarregarContagem(client)));
      // Pegando hora de inicialização do BOT
      console.log(corTexto(await botStart()));
      // Verificando se os campos do .env foram modificados e envia para o console
      verificarEnv();

      // VERIFICANDO SE O NÚMERO É DO BOT
      const botNumber = await client.getHostNumber();

      // INICIO DO SERVIDOR
      console.log('[SERVIDOR] Servidor iniciado!');

      // Forçando para continuar na sessão atual
      client.onStateChanged((estado) => {
        console.log('[ESTADO CLIENTE]', estado);
        if (estado === 'CONFLICT' || estado === 'UNLAUNCHED') client.forceRefocus();
      });

      let simiAtivo = false;
      async function handleSimiMessage(client, message, simiAtivo) {
        if (simiAtivo && message.fromMe) {
          const userMessage = message.body;
          const answer = await callSimSimi(userMessage);
          await client.sendText(message.from, answer);
        }
      };      

      // Ouvindo mensagens
      client.onMessage(async (message) => {
        if (!await antiTrava(client, message)) return;
        if (!await antiLink(client, message)) return;
        if (!await antiFlood(client, message)) return;
        if (!await antiPorno(client, message)) return;
        try {
          if (simiAtivo) { await handleSimiMessage(client, message, simiAtivo)
          }else{
            await checagemMensagem(client, message);
            await chamadaComando(client, message);
          }
        } catch (err) {
          consoleErro(err);
        }
      });

      // Ouvindo entrada/saida de participantes dos grupos
      client.onGlobalParticipantsChanged(async (ev) => { await eventosGrupo(client, ev); });
      // Ouvindo se a entrada do BOT em grupos
      client.onAddedToGroup(async (chat) => {
        await cadastrarGrupo(chat.id, "added", client);
        let gInfo = await client.getGroupInfo(chat.id);
        await client.sendText(chat.id, criarTexto(msgs_texto.geral.entrada_grupo, gInfo.title));
      });
      // Ouvindo ligações recebidas
      client.onIncomingCall(async (call) => {
        // await client.sendText(call.peerJid, msgs_texto.geral.sem_ligacoes).then(async () => { client.contactBlock(call.peerJid) });
      });
    }

      // AGENDADOR DE TAREFAS
      cron.schedule('0 0 * * *', async () => {
        console.log('[CRON] Iniciando tarefa agendada...');
        console.log('[CRON] Verificando lista negra dos grupos...');
        //console.log(corTexto(await verificacaoListaNegraGeral(client)));
        console.log('[CRON] Atualizando participantes dos grupos...');
        //console.log(corTexto(await atualizarParticipantes(client)));
        console.log('[CRON] Recarregando contagem de mensagens...');
        //console.log(corTexto(await recarregarContagem(client)));
        console.log('[CRON] Tarefa agendada concluída!');
      });

      // SESSÃO ENCERRADA
      client.onStateChanged(async (state) => {
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') {
          console.log('[SERVIDOR] Sessão encerrada!');
          await client.forceRefocus();
        }
      });

  } catch (err) {
    // Faça algo se der erro em alguma das funções acima
    console.log(err);
    console.error(corTexto("[ERRO FATAL]", "#d63e3e"), err.message);
    setTimeout(() => {
      return client.kill();
    }, 10000);
  }

}
