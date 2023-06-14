//REQUERINDO MÓDULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const msgs_texto = require('../lib/msgs')
const {criarTexto, erroComandoMsg, obterNomeAleatorio, removerNegritoComando} = require("../lib/util")
const path = require('path')
const api = require("../lib/api")
const {converterMp4ParaMp3} = require("../lib/conversao")
const {default: PQueue} = require('p-queue')
const filaImg = new PQueue({concurrency: 2, timeout: 60000})
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const ttsClient = new TextToSpeechClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
const textoParaVoz = require('../lib/api').textoParaVoz;
const { callChatGPT } = require('../lib/api');
const { openaiInstance, redisClient } = require('../lib/api');



const Replicate = require('replicate');
const fetch = require('cross-fetch');
const apiKey = process.env.REPLICATE_API_TOKEN;
const express = require('express');
const bodyParser = require('body-parser');

if (!apiKey) {
  console.error("API token not found. Please set the REPLICATE_API_TOKEN environment variable.");
  process.exit(1);
}

const replicate = new Replicate({ auth: apiKey });
const app = express();
app.use(bodyParser.json());

// Função para gerar imagens usando a API replicate
async function gerarImagensIA(prompt, webhookURL) {
  const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
  const input = { prompt, webhook: webhookURL, webhook_events_filter: ["completed"] };

  try {
    const output = await replicate.predictions.create({ version: model, input });

    if (output && output.files) {
      const imagensGeradas = output.files.slice(0, 4);
      return imagensGeradas;
    } else {
      throw new Error('A API replicate não retornou os dados esperados.');
    }
  } catch (error) {
    console.error("Failed to run predictions:", error);
    throw new Error('Ocorreu um erro ao gerar as imagens usando a API replicate.');
  }
}

// Rota para o endpoint do webhook
app.post('/replicate-webhook', async (req, res) => {
    try {
      const prediction = req.body;
  
      // Processar os dados recebidos do webhook
      console.log('Recebido webhook:', prediction);
      // Implemente sua lógica para lidar com os dados recebidos do webhook
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

// Função para processar o comando "!gerar"
const processarComandoGerar = async (client, message, args) => {
  const prompt = args.slice(1).join(' '); // Texto prompt fornecido pelo usuário
  const webhookURL = "https://example.com/your-webhook"; // URL do seu webhook

  try {
    const imagensGeradas = await gerarImagensIA(prompt, webhookURL);
    // Enviar as imagens geradas para o cliente do WhatsApp
    for (const imagem of imagensGeradas) {
      await client.sendImage(message.from, imagem, 'imagem.jpg', 'Imagem gerada pela IA');
    }
  } catch (error) {
    console.error(error);
    await client.reply(message.from, 'Ocorreu um erro ao gerar as imagens.', message.id);
  }
};

// Configurar o servidor Express
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = utilidades = async (client, message) => {
  try {
    const { type, id, from, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, body } = message;
    const commands = caption || body || '';
    var command = commands.toLowerCase().split(' ')[0] || '';
    command = removerNegritoComando(command);
    const args = commands.split(' ');
    const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';

    switch (command) {
      // NOVOS COMANDOS
            case '!gerar':
                if (args.length < 2) {
                client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !gerar <prompt>', id);
                } else {
                await processarComandoGerar(client, message, args);
                }
                break

            case '!simi':
                simiAtivo = !simiAtivo;
                const statusSimi = simiAtivo ? 'Sim Simi ativado.' : 'Sim Simi desativado.';
                await client.sendText(from, statusSimi);
                if (simiAtivo && message.fromMe) {
                    const userMessage = message.body;
                    const answer = await api.callSimSimi(userMessage);
                    await client.sendText(message.from, answer);
                }

            break

            case "!tabela":
                var tabela = await api.obterTabelaNick()
                await client.reply(from, criarTexto(msgs_texto.utilidades.tabela.resposta, tabela), id)
                break

            case "!letra":
                if(args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                try{
                    var usuarioTexto = body.slice(7).trim(), dadosMusica = await api.obterLetraMusica(usuarioTexto)
                    await client.sendImage(from, dadosMusica.imagem, "artista.jpg", criarTexto(msgs_texto.utilidades.letra.resposta, dadosMusica.titulo, dadosMusica.artista, dadosMusica.letra), id)
                } catch(err){
                    await client.reply(from, err.message, id)
                }
                break
                
            case "!ddd":
                var DDD = null
                if(quotedMsg){
                    let DDI = quotedMsgObj.author.slice(0,2)
                    if(DDI != "55") return client.reply(from, msgs_texto.utilidades.ddd.somente_br ,id)
                    DDD = quotedMsgObj.author.slice(2,4)
                } else if(args.length > 1 && args[1].length == 2){
                    if(args[1].length != 2) return client.reply(from, msgs_texto.utilidades.ddd.erro_ddd ,id)
                    DDD = args[1]
                } else {
                    return client.reply(from, erroComandoMsg(command), id)
                }
                try{
                    var resposta = await api.obterInfoDDD(DDD)
                    client.reply(from,resposta,id)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break

            case "!audio":
                if(args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                var efeitosSuportados = ['estourar','x2', 'reverso', 'grave', 'agudo', 'volume'], tipoEfeito = body.slice(7).trim()
                if(!efeitosSuportados.includes(tipoEfeito)) return client.reply(from, erroComandoMsg(command), id)
                if(quotedMsg && (quotedMsg.type === "ptt" || quotedMsg.type === "audio") ){
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                    var audioOriginal = path.resolve(`./media/audios/${obterNomeAleatorio(".mp3")}`)
                    fs.writeFileSync(audioOriginal, mediaData, "base64")
                    try{
                        var audioEditado = await api.obterAudioModificado(audioOriginal, tipoEfeito)
                        client.sendFile(from, audioEditado, "audio.mp3","", id).then(()=>{
                            fs.unlinkSync(audioEditado)
                            fs.unlinkSync(audioOriginal)
                        })
                    } catch(err){
                        fs.unlinkSync(audioOriginal)
                        client.reply(from, err.message, id)
                    }
                } else {
                    client.reply(from, erroComandoMsg(command), id)
                }
                break

            case "!qualmusica":
                var dadosMensagem = quotedMsg ? quotedMsg : message
                if(dadosMensagem.mimetype != "video/mp4" && dadosMensagem.type != "audio" && dadosMensagem.type != "ptt") return client.reply(from, erroComandoMsg(command), id)
                var caminhoAudio = null, caminhoVideo = null
                var mediaData = await decryptMedia(dadosMensagem, uaOverride)
                await client.reply(from, msgs_texto.utilidades.qualmusica.espera, id)
                if(dadosMensagem.mimetype == "video/mp4"){
                    caminhoVideo = path.resolve(`media/videos/${obterNomeAleatorio(".mp4")}`)
                    fs.writeFileSync(caminhoVideo, mediaData, "base64")
                    try{
                        caminhoAudio = await converterMp4ParaMp3(caminhoVideo)
                        fs.unlinkSync(caminhoVideo)
                    }catch(err){
                        fs.unlinkSync(caminhoVideo)
                        client.reply(from, msgs_texto.utilidades.qualmusica.erro_conversao, id)
                    }
                }
                if(dadosMensagem.type == "audio" || dadosMensagem.type == "ptt"){
                    caminhoAudio = path.resolve(`media/audios/${obterNomeAleatorio(".mp3")}`)
                    fs.writeFileSync(caminhoAudio, mediaData, "base64");
                }
                try{
                    var resp = await api.obterReconhecimentoMusica(caminhoAudio)
                    fs.unlinkSync(caminhoAudio)
                    client.reply(from, criarTexto(msgs_texto.utilidades.qualmusica.resposta, resp.titulo, resp.produtora, resp.duracao, resp.lancamento, resp.album, resp.artistas), id)
                }catch(err){
                    client.reply(from, err.message, id)
                }
                break

            case "!clima":
                if (args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                try {
                    var usuarioTexto = body.slice(7).trim(), clima = await api.obterClima(usuarioTexto)
                    var respostaClimaTexto = criarTexto(msgs_texto.utilidades.clima.resposta, clima.texto), respostaClimaFoto = clima.foto_clima
                    client.sendFileFromUrl(from, respostaClimaFoto, `${body.slice(7)}.png`, respostaClimaTexto, id)
                } catch (err) {
                    client.reply(from, err.message, id)
                }
                break

            case "!moeda":
                if(args.length !== 3) return client.reply(from, erroComandoMsg(command), id)
                try{
                    var usuarioMoedaInserida = args[1], usuarioValorInserido = args[2], conversaoMoeda = await api.obterConversaoMoeda(usuarioMoedaInserida, usuarioValorInserido)
                    var itens = ''
                    for(var c of  conversaoMoeda.conversao) itens += criarTexto(msgs_texto.utilidades.moeda.resposta_item, c.conversao, c.valor_convertido_formatado, c.tipo, c.atualizacao)
                    var respostaFinal = criarTexto(msgs_texto.utilidades.moeda.resposta_completa, conversaoMoeda.valor_inserido, conversaoMoeda.moeda_inserida, itens)
                    await client.reply(from, respostaFinal ,id)
                } catch(err){
                    await client.reply(from, err.message , id)
                }
                break

            case "!pesquisa":
                if (args.length === 1) return client.reply(from, erroComandoMsg(command) , id)
                try{
                    var usuarioTexto = body.slice(10).trim(), pesquisaResultados = await api.obterPesquisaWeb(usuarioTexto)
                    var pesquisaResposta = criarTexto(msgs_texto.utilidades.pesquisa.resposta_titulo, usuarioTexto)
                    for(let resultado of pesquisaResultados){
                        pesquisaResposta += "═════════════════\n"
                        pesquisaResposta += criarTexto(msgs_texto.utilidades.pesquisa.resposta_itens, resultado.titulo, resultado.link, resultado.descricao)
                    }
                    client.reply(from, pesquisaResposta, id)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break

            case '!rastreio':
                if (args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                try{
                    var usuarioCodigoRastreio = body.slice(10).trim(), rastreioDados = await api.obterRastreioCorreios(usuarioCodigoRastreio)
                    var rastreioResposta = msgs_texto.utilidades.rastreio.resposta_titulo
                    for(let dado of rastreioDados){
                        var local = (dado.local != undefined) ?  `Local : ${dado.local}` : `Origem : ${dado.origem}\nDestino : ${dado.destino}`
                        rastreioResposta += criarTexto(msgs_texto.utilidades.rastreio.resposta_itens, dado.status, dado.data, dado.hora, local)
                        rastreioResposta += "-----------------------------------------\n"
                    }
                    await client.reply(from, rastreioResposta, id)
                } catch(err){
                    await client.reply(from, err.message ,id)
                }
                break
            
            case "!anime":
                if(isMedia || quotedMsg){
                    var dadosMensagem = {
                        tipo: (isMedia)? type : quotedMsg.type,
                        mimetype: (isMedia)? mimetype : quotedMsg.mimetype,
                        mensagem: (isMedia)? message : quotedMsg
                    }
                    if(dadosMensagem.tipo === "image"){
                        client.reply(from,msgs_texto.utilidades.anime.espera, id)
                        var mediaData = await decryptMedia(dadosMensagem.mensagem, uaOverride)
                        var usuarioImgBase64 = `data:${dadosMensagem.mimetype};base64,${mediaData.toString('base64')}`
                        try{
                            var animeInfo = await api.obterAnimeInfo(usuarioImgBase64)
                            if(animeInfo.similaridade < 87) return client.reply(from,msgs_texto.utilidades.anime.similaridade,id)
                            animeInfo.episodio = animeInfo.episodio || "---"
                            var respostaAnimeInfo = criarTexto(msgs_texto.utilidades.anime.resposta, animeInfo.titulo, animeInfo.episodio, animeInfo.tempoInicial, animeInfo.tempoFinal, animeInfo.similaridade, animeInfo.link_previa)
                            await client.reply(from, respostaAnimeInfo, id)
                        } catch(err){
                            client.reply(from,err.message,id)
                        }
                    } else {
                        client.reply(from,erroComandoMsg(command), id)
                    }
                } else {
                    client.reply(from,erroComandoMsg(command), id)
                }
                break

            case "!animelanc":
                try{
                    var resultadosAnimes = await api.obterAnimesLancamentos()
                    var respostaLancamentos = msgs_texto.utilidades.animelanc.resposta_titulo
                    for(let anime of resultadosAnimes){
                        respostaLancamentos += criarTexto(msgs_texto.utilidades.animelanc.resposta_itens, anime.titulo, anime.episodio, anime.url)
                    }
                    client.reply(from, respostaLancamentos, id)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break
            
            case "!traduz":
                var usuarioTexto = "", idiomaTraducao = 'pt'
                if(quotedMsg  && quotedMsg.type == "chat"){
                    if(args.length === 1) return client.reply(from, erroComandoMsg(command) ,id)
                    idiomaTraducao = args[1]
                    usuarioTexto = quotedMsg.body
                } else if(!quotedMsg && type == "chat" ){
                    if(args.length < 3) return client.reply(from, erroComandoMsg(command) ,id)
                    idiomaTraducao = args[1]
                    usuarioTexto = args.slice(2).join(" ")
                } else {
                    return client.reply(from, erroComandoMsg(command) ,id)
                }
                try{
                    var respostaTraducao = await api.obterTraducao(usuarioTexto, idiomaTraducao)
                    client.reply(from, respostaTraducao, id)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break  

            case '!voz':
                let texto;
                
                if (quotedMsg && quotedMsg.type === 'chat') {
                    texto = quotedMsg.body;
                } else if (args.length >= 2) {
                    texto = args.slice(1).join(' ');
                } else {
                    return client.reply(from, 'Você precisa fornecer um texto para gerar a voz.', id);
                }
                
                let idioma = 'pt-BR'; // Definir o idioma padrão como pt-BR
                
                if (texto.includes(';')) {
                    const [lang, ...textParts] = texto.split(';');
                    idioma = lang.toLowerCase().trim(); // Extrair o idioma e remover espaços em branco
                    texto = textParts.join(';').trim(); // Reunir o restante do texto
                
                    if (texto.length === 0) {
                    return client.reply(from, 'Você precisa fornecer um texto para gerar a voz.', id);
                    }
                }
                
                const voiceOptions = {
                    languageCode: idioma,
                };
                
                try {
                    const audioPath = await api.textoParaVoz(texto, voiceOptions);
                    await client.sendPtt(from, audioPath);
                    fs.unlinkSync(audioPath);
                } catch (err) {
                    console.error(err);
                    return client.reply(from, 'Ocorreu um erro ao gerar o áudio.', id);
                }
                
            break
                  

            case '!falar':
                var usuarioTexto = '', idMensagem = id
                if (args.length === 1) {
                    return client.reply(from, erroComandoMsg(command) ,id)
                } else if(quotedMsg  && quotedMsg.type == 'chat'){
                    usuarioTexto = (args.length == 2) ? quotedMsg.body : body.slice(8).trim()
                } else {
                    usuarioTexto = body.slice(8).trim()
                }
                if (!usuarioTexto) return client.reply(from, msgs_texto.utilidades.voz.texto_vazio , id)
                if (usuarioTexto.length > 100000) return client.reply(from, msgs_texto.utilidades.voz.texto_longo, id)
                if(quotedMsg) idMensagem = quotedMsgObj.id
                try{
                    var respostaAudio = await api.textoParaVozIBM(idioma, usuarioTexto)
                    client.sendPtt(from, respostaAudio, idMensagem)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break

            case '!noticias':
                try{
                    var listaNoticias = await api.obterNoticias()
                    var respostaNoticias = msgs_texto.utilidades.noticia.resposta_titulo
                    for(let noticia of listaNoticias){
                        respostaNoticias += criarTexto(msgs_texto.utilidades.noticia.resposta_itens, noticia.titulo, noticia.descricao || "Sem descrição", noticia.url)
                    }
                    await client.reply(from, respostaNoticias, id)
                } catch(err){
                    await client.reply(from, err.message, id)
                }
                break;

            case '!calc':
                if(args.length === 1) return client.reply(from, erroComandoMsg(command) ,id)
                var usuarioExpressaoMatematica = body.slice(6).trim()
                try{
                    var resultadoCalculo = await api.obterCalculo(usuarioExpressaoMatematica)
                    var respostaCalc = criarTexto(msgs_texto.utilidades.calc.resposta, resultadoCalculo)
                    client.reply(from, respostaCalc, id)
                } catch(err){
                    client.reply(from, err.message, id)
                }
                break

            // NOVOS COMANDOS


            //========= INÍCIO CONFIGURAÇÃO CHAT GPT 3==== utilidades.js ======//
            case '!chat':
                const userMessage = message.body.replace('!chat', '').trim();
                const answer = await callChatGPT(openaiInstance, chatId, userMessage);
                const respostaText = `${answer}`;
                var respostaTexto = criarTexto(msgs_texto.utilidades.chat.resposta, respostaText)
                await client.sendText(from, respostaTexto);
                break
            //========= FIM CONFIGURAÇÃO CHAT GPT 3==== utilidades.js ======//  
                
            case '!dalle':
                if(quotedMsg || type != "chat") return await client.reply(from, erroComandoMsg(command) , id)
                var usuarioQuantidadeFotos = parseInt(args[1]);
                qtdFotos = isNaN(usuarioQuantidadeFotos) ? 1 : Math.min(Math.max(usuarioQuantidadeFotos, 1), 5);
                textoImagem = args.slice(2).join(" ").trim();
                usuarioQuantidadeFotos = qtdFotos
                if (!textoImagem) return await client.reply(from, erroComandoMsg(command), id)
                if (textoImagem.length > 120) return await client.reply(from, msgs_texto.utilidades.dalle.tema_longo , id)
                await filaImg.add(async ()=>{
                try{
                    var resultadosImagens = [await api.generateDALLEImage(textoImagem, qtdFotos)];
                    for(let imagem of resultadosImagens){
                        client.sendFileFromUrl(from, imagem , "foto.png" , "", (qtdFotos == 1) ? id : "").catch(async ()=>{
                            await client.sendText(from, msgs_texto.utilidades.dalle.erro_imagem)
                        })
                    }
                } catch(err){
                    await client.reply(from, err.message, id)
                }
            })
            break

            case '!noticiasus':
                try {
                    var listaNoticias = await api.obterNoticiasUS()
                    var respostaNoticias = msgs_texto.utilidades.noticiasus.resposta_titulo
                    for (let noticia of listaNoticias) {
                        respostaNoticias += criarTexto(msgs_texto.utilidades.noticiasus.resposta_itens, noticia.titulo, noticia.descricao || "Sem descrição", noticia.url)
                    }
                    await client.reply(from, respostaNoticias, id)
                } catch (err) {
                    await client.reply(from, err.message, id)
                }
                break;

            case "!ddi":
                var DDI = null
                if (quotedMsg) {
                    let DDI = quotedMsgObj.author.slice(0, 2)
                } else if (args.length > 1 && args[1].length == 4) {
                    if (args[1].length != 4) return client.reply(from, msgs_texto.utilidades.ddi.erro_ddi, id)
                    DDI = args[1]
                } else {
                    return client.reply(from, erroComandoMsg(command), id)
                }
                try {
                    var resposta = await api.obterInfoDDI(DDI)
                    client.reply(from, resposta, id)
                } catch (err) {
                    client.reply(from, err.message, id)
                }
                break

            case "!acao":
                if (args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                try {
                    var usuarioTexto = await api.obterAcao(usuarioTexto)
                    var respostaAcaoTexto = criarTexto(msgs_texto.utilidades.acao.resposta, acao.texto)
                    client.reply(from, respostaAcaoTexto, id)
                } catch (err) {
                    client.reply(from, err.message, id)
                }
                break

        }
    } catch(err){
        throw err
    } 

}