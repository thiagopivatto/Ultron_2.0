//REQUERINDO MODULOS
const msgs_texto = require('../lib/msgs')
const { criarTexto, primeiraLetraMaiuscula, erroComandoMsg, removerNegritoComando } = require("../lib/util")
const path = require("path")
const api = require('../lib/api')
const axios = require('axios')


module.exports = diversao = async (client, message) => {
    try {
        const { id, from, sender, isGroupMsg, chat, caption, quotedMsg, quotedMsgObj, mentionedJidList, body } = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args = commands.split(' ')
        const ownerNumber = process.env.NUMERO_DONO.trim() // Número do administrador do bot
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const isGroup = from.endsWith('@g.us')
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const groupOwner = isGroupMsg ? chat.groupMetadata.owner : ''
  
        switch (command) {
            case '!detector':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg) return await client.reply(from, erroComandoMsg(command), id)
                var imgsDetector = ['verdade', 'vaipra', 'mentiroso', 'meengana', 'kao', 'incerteza', 'estresse', 'conversapraboi']
                var indexAleatorio = Math.floor(Math.random() * imgsDetector.length)
                await client.sendFile(from, './media/img/comandos/detector/calibrando.png', 'detector.png', msgs_texto.diversao.detector.espera, id)
                await client.sendFile(from, `./media/img/comandos/detector/${imgsDetector[indexAleatorio]}.png`, 'detector.png', "", quotedMsgObj.id)
                break

            case '!viadometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length == 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.viadometro.apenas_um, id)
                var respostas = msgs_texto.diversao.viadometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                //if(ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.viadometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case '!bafometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length == 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.bafometro.apenas_um, id)
                var respostas = msgs_texto.diversao.bafometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                //if(ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.bafometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case "!caracoroa":
                var ladosMoeda = ["cara", "coroa"], indexAleatorio = Math.floor(Math.random() * ladosMoeda.length)
                await client.reply(from, msgs_texto.diversao.caracoroa.espera, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.caracoroa.resposta, primeiraLetraMaiuscula(ladosMoeda[indexAleatorio]))
                await client.sendFile(from, path.resolve(`media/img/comandos/caracoroa/${ladosMoeda[indexAleatorio]}.png`), `${ladosMoeda[indexAleatorio]}.png`, respostaTexto, id)
                break

            case "!ppt":
                var ppt = ["pedra", "papel", "tesoura"], indexAleatorio = Math.floor(Math.random() * ppt.length)
                if (args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                if (!ppt.includes(args[1].toLowerCase())) return await client.reply(from, msgs_texto.diversao.ppt.opcao_erro, id)
                var escolhaBot = ppt[indexAleatorio], iconeEscolhaBot = null, escolhaUsuario = args[1].toLowerCase(), iconeEscolhaUsuario = null, vitoriaUsuario = null
                if (escolhaBot == "pedra") {
                    iconeEscolhaBot = "✊"
                    if (escolhaUsuario == "pedra") vitoriaUsuario = null, iconeEscolhaUsuario = "✊"
                    if (escolhaUsuario == "tesoura") vitoriaUsuario = false, iconeEscolhaUsuario = "✌️"
                    if (escolhaUsuario == "papel") vitoriaUsuario = true, iconeEscolhaUsuario = "✋"
                } else if (escolhaBot == "papel") {
                    iconeEscolhaBot = "✋"
                    if (escolhaUsuario == "pedra") vitoriaUsuario = false, iconeEscolhaUsuario = "✊"
                    if (escolhaUsuario == "tesoura") vitoriaUsuario = true, iconeEscolhaUsuario = "✌️"
                    if (escolhaUsuario == "papel") vitoriaUsuario = null, iconeEscolhaUsuario = "✋"
                } else {
                    iconeEscolhaBot = "✌️"
                    if (escolhaUsuario == "pedra") vitoriaUsuario = true, iconeEscolhaUsuario = "✊"
                    if (escolhaUsuario == "tesoura") vitoriaUsuario = null, iconeEscolhaUsuario = "✌️"
                    if (escolhaUsuario == "papel") vitoriaUsuario = false, iconeEscolhaUsuario = "✋"
                }
                var textoResultado = ''
                if (vitoriaUsuario == true) textoResultado = msgs_texto.diversao.ppt.resposta.vitoria
                else if (vitoriaUsuario == false) textoResultado = msgs_texto.diversao.ppt.resposta.derrota
                else textoResultado = msgs_texto.diversao.ppt.resposta.empate
                await client.reply(from, criarTexto(textoResultado, iconeEscolhaUsuario, iconeEscolhaBot), id)
                break

            case '!massacote':
            case '!mascote':
                var mascoteFotoURL = "https://i.imgur.com/mVwa7q4.png"
                await client.sendFileFromUrl(from, mascoteFotoURL, 'mascote.jpeg', 'Whatsapp Jr.', id)
                break

            case '!malacos':
                const malacosFotoURL = "https://i.imgur.com/7bcn2TK.jpg"
                await client.sendFileFromUrl(from, malacosFotoURL, 'malacos.jpg', 'Somos o problema', id)
                break

            case '!roletarussa':
            case '!roulette':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                //if (!isGroupAdmins) return await client.reply(from, msgs_texto.permissao.apenas_admin , id)
                if (!isBotGroupAdmins) return await client.reply(from, msgs_texto.permissao.bot_admin, id)
                var idParticipantesAtuais = await client.getGroupMembersId(groupId)
                idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(groupOwner), 1)
                idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(botNumber + '@c.us'), 1)
                if (idParticipantesAtuais.length == 0) return await client.reply(from, msgs_texto.diversao.roletarussa.sem_membros, id)
                var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.roletarussa.resposta, idParticipantesAtuais[indexAleatorio].replace(/@c.us/g, ''))
                await client.reply(from, msgs_texto.diversao.roletarussa.espera, id)
                await client.sendTextWithMentions(from, respostaTexto)
                await client.removeParticipant(groupId, idParticipantesAtuais[indexAleatorio])
                break

            case '!casal':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                var idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if (idParticipantesAtuais.length < 2) return await client.reply(from, msgs_texto.diversao.casal.minimo, id)
                var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida1 = idParticipantesAtuais[indexAleatorio]
                idParticipantesAtuais.splice(indexAleatorio, 1)
                indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida2 = idParticipantesAtuais[indexAleatorio]
                var respostaTexto = criarTexto(msgs_texto.diversao.casal.resposta, pessoaEscolhida1.replace(/@c.us/g, ''), pessoaEscolhida2.replace(/@c.us/g, ''))
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case '!gadometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length === 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.gadometro.apenas_um, id)
                var respostas = msgs_texto.diversao.gadometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if (ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.gadometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case '!par':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (mentionedJidList.length !== 2) return await client.reply(from, erroComandoMsg(command), id)
                var respostas = msgs_texto.diversao.par.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.par.resposta, mentionedJidList[0].replace(/@c.us/g, ''), mentionedJidList[1].replace(/@c.us/g, ''), respostas[indexAleatorio])
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case "!fch":
                try {
                    var respostaFrase = await api.obterCartasContraHu()
                    await client.reply(from, respostaFrase, id)
                } catch (err) {
                    await client.reply(from, err.message, id)
                }
                break

            // NOVOS COMANDOS

            case '!gato':
                const gato = "https://i.imgur.com/mPoHCoS.gif"
                await client.sendFileFromUrl(from, gato, 'gato.gif', "GATITO", id)
                break

            case '!trisal':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                var idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if (idParticipantesAtuais.length < 3) return await client.reply(from, msgs_texto.diversao.trisal.minimo, id)
                var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida1 = idParticipantesAtuais[indexAleatorio]
                idParticipantesAtuais.splice(indexAleatorio, 1)
                indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida2 = idParticipantesAtuais[indexAleatorio]
                idParticipantesAtuais.splice(indexAleatorio, 2)
                indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida3 = idParticipantesAtuais[indexAleatorio]
                idParticipantesAtuais.splice(indexAleatorio, 3)
                indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.trisal.resposta, pessoaEscolhida1.replace(/@c.us/g, ''), pessoaEscolhida2.replace(/@c.us/g, ''), pessoaEscolhida3.replace(/@c.us/g, ''))
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case '!top':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                var qtdUsuarios = args[1], temaRanking = body.slice(7).trim(), idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if (isNaN(qtdUsuarios)) return client.reply(from, msgs_texto.diversao.top.erro_qtd, id)
                if (qtdUsuarios > 50) return client.reply(from, msgs_texto.diversao.top.limite_qtd, id)
                if (qtdUsuarios > idParticipantesAtuais.length) return client.reply(from, msgs_texto.diversao.top.erro_qtd, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.top.resposta_titulo, qtdUsuarios, temaRanking)
                for (let i = 0; i < qtdUsuarios; i++) {
                    var medalha = ""
                    switch (i + 1) {
                        case 1:
                            medalha = '🥇'
                            break
                        case 2:
                            medalha = '🥈'
                            break
                        case 3:
                            medalha = '🥉'
                            break
                        default:
                            medalha = ''
                    }
                    var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                    var membroSelecionado = idParticipantesAtuais[indexAleatorio]
                    respostaTexto += criarTexto(msgs_texto.diversao.top.resposta_itens, medalha, i + 1, membroSelecionado.replace(/@c.us/g, ''))
                    idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(membroSelecionado), 1)
                }
                await client.sendTextWithMentions(from, respostaTexto)
                break


            case '!jacometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length === 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.jacometro.apenas_um, id)
                var respostas = msgs_texto.diversao.jacometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if (ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.jacometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case '!bolametro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length === 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.bolametro.apenas_um, id)
                var respostas = msgs_texto.diversao.bolametro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if (ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.bolametro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case '!fernandometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!quotedMsg && mentionedJidList.length === 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.fernandometro.apenas_um, id)
                var respostas = msgs_texto.diversao.fernandometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if (ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.fernandometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case "!vod":
                if (!isGroupMsg) return await client.reply(from, "Este comando só pode ser usado em grupos.", id);
                if (args.length < 3 || args.length > 4) {
                    return await client.reply(from, "Formato inválido. Use !vod [vdd/dsf] [nível]", id);
                }
                const tipoEscolha = args[1].toLowerCase();
                const nivel = parseInt(args[2]);
                const tipoEscolhaMapeado = tipoEscolha === 'vdd' ? 'truth' : tipoEscolha === 'dsf' ? 'dare' : '';
                if (!tipoEscolhaMapeado) {
                    return await client.reply(from, "Tipo de escolha inválido. Use vdd ou dsf.", id);
                }
                if (isNaN(nivel) || nivel < 1 || nivel > 5) {
                    return await client.reply(from, "Nível inválido. Use um número de 1 a 5.", id);
                }
                const frasesVOD = await axios.get("https://gist.githubusercontent.com/thiagopivatto/3ed7f417a37590b75745cc1c4cba450a/raw/a960f63a10323565a21c32d13a457edca67ebb75/vod.json");
                const frasesFiltradas = frasesVOD.data.filter(frase => frase.level === nivel.toString() && frase.type.toLowerCase() === tipoEscolhaMapeado);
                if (frasesFiltradas.length > 0) {
                    await api.traduzirFrases(frasesFiltradas);
                    const fraseSelecionada = frasesFiltradas[Math.floor(Math.random() * frasesFiltradas.length)];
                    const mensagemResposta = `Nível: ${nivel}\nTipo: ${tipoEscolha}\nFrase: ${fraseSelecionada.summary}`;
                    await client.reply(from, mensagemResposta, id);
                } else {
                    await client.reply(from, "Não foram encontradas frases com o nível e tipo especificados.", id);
                }
                break










                //--------------------FUTEBOL--------------------

                case '!buscatime':
                    if (args.length < 2) {
                      client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !buscatime <nomeTime>', id);
                    } else {
                      const nomeTime = args.slice(1).join(' '); // Obtém o nome do time a ser buscado
                      api.obterIDTime(nomeTime)
                        .then((data) => {
                          if (data.data.length > 0) {
                            const timeEncontrado = data.data[0];
                            const resposta = `⚽️ Informações do time ${timeEncontrado.name} ⚽️\n\n🆔 ID do time: ${timeEncontrado.id}\n🏟️ ID do estádio: ${timeEncontrado.venue_id}\n🌍 País: ${timeEncontrado.country}`;
                            client.sendFileFromUrl(from, timeEncontrado.logo, 'logo.png', resposta, id);
                          } else {
                            client.reply(from, 'Time não encontrado.', id);
                          }
                        })
                        .catch((error) => {
                          console.error('Erro ao buscar o time:', error);
                          client.reply(from, 'Não foi possível buscar o time no momento.', id);
                        });
                    }
                    break;
                    

                    case '!jogadores':
                      if (args.length < 2) {
                        client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !jogadores <nomeTime>', id);
                      } else {
                        const nomeTime = args.slice(1).join(' ');
                        api.obterIDTime(nomeTime)
                          .then((data) => {
                            const timesEncontrados = data.data.filter((time) => time.name.toLowerCase() === nomeTime.toLowerCase());
                            if (timesEncontrados.length > 0) {
                              const timeEncontrado = timesEncontrados[0];
                              api.obterJogadoresDoTime(timeEncontrado.id)
                                .then(async (jogadores) => {
                                  if (jogadores.data.length > 0) {
                                    const jogadoresOrdenados = jogadores.data
                                      .sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' })) // Ordena os jogadores por nome em ordem alfabética (considerando acentos)
                                      .filter((jogador, index, array) => {
                                        // Filtra os jogadores para evitar nomes repetidos
                                        return array.findIndex((j) => j.name === jogador.name) === index;
                                      });
                    
                                    let listaGoleiros = [];
                                    let listaDefensores = [];
                                    let listaMeioCampistas = [];
                                    let listaAtacantes = [];
                                    let listaNaoDefinidos = [];
                    
                                    for (const jogador of jogadoresOrdenados) {
                                      const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                    
                                      if (posicaoPrincipal) {
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                    
                                        if (posicaoTraduzida.toLowerCase().includes('goleiro')) {
                                          listaGoleiros.push(jogador);
                                        } else if (posicaoTraduzida.toLowerCase().includes('zagueiro') || posicaoTraduzida.toLowerCase().includes('ala') || posicaoTraduzida.toLowerCase().includes('lateral') || posicaoTraduzida.toLowerCase().includes('defensor') || posicaoTraduzida.toLowerCase().includes('líbero')) {
                                          listaDefensores.push(jogador);
                                        } else if (posicaoTraduzida.toLowerCase().includes('volante') || posicaoTraduzida.toLowerCase().includes('meia')) {
                                          listaMeioCampistas.push(jogador);
                                        } else if (posicaoTraduzida.toLowerCase().includes('atacante') || posicaoTraduzida.toLowerCase().includes('ponta') || posicaoTraduzida.toLowerCase().includes('extremo') || posicaoTraduzida.toLowerCase().includes('centroavante')) {
                                          listaAtacantes.push(jogador);
                                        } else {
                                          listaNaoDefinidos.push(jogador);
                                        }
                                      } else {
                                        listaNaoDefinidos.push(jogador);
                                      }
                                    }
                    
                                    // // Ordenar os jogadores de cada lista em ordem alfabética
                                    // listaGoleiros.sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' }));
                                    // listaDefensores.sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' }));
                                    // listaMeioCampistas.sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' }));
                                    // listaAtacantes.sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' }));
                                    // listaNaoDefinidos.sort((jogadorA, jogadorB) => jogadorA.name.localeCompare(jogadorB.name, 'pt', { sensitivity: 'base' }));

                                    // Ordenar os jogadores pelo número da camisa em ordem crescente
                                    listaGoleiros.sort((jogadorA, jogadorB) => jogadorA.shirt_number - jogadorB.shirt_number);
                                    listaDefensores.sort((jogadorA, jogadorB) => jogadorA.shirt_number - jogadorB.shirt_number);
                                    listaMeioCampistas.sort((jogadorA, jogadorB) => jogadorA.shirt_number - jogadorB.shirt_number);
                                    listaAtacantes.sort((jogadorA, jogadorB) => jogadorA.shirt_number - jogadorB.shirt_number);
                                    listaNaoDefinidos.sort((jogadorA, jogadorB) => jogadorA.shirt_number - jogadorB.shirt_number);
                    
                                    let listaJogadores = `⚽️ *JOGADORES DO TIME ${timeEncontrado.name}* ⚽️\n\n`;
                    
                                    if (listaGoleiros.length > 0) {
                                      listaJogadores += `⭐️ *GOLEIROS* ⭐️\n\n`;
                                      for (const jogador of listaGoleiros) {
                                        const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                                        listaJogadores += `*_${jogador.name.toUpperCase()}_*\n👕 Número da camisa: ${jogador.shirt_number}\n⚽️ Posição: ${posicaoTraduzida}\n📅 Dt. Nascimento: ${jogador.date_birth_at} ️\n⬆️ Altura: ${jogador.height}\n\n`;
                                      }
                                    }
                    
                                    if (listaDefensores.length > 0) {
                                      listaJogadores += `⚔️ *DEFENSORES* ⚔️\n\n`;
                                      for (const jogador of listaDefensores) {
                                        const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                                        listaJogadores += `*_${jogador.name.toUpperCase()}_*\n👕 Número da camisa: ${jogador.shirt_number}\n⚽️ Posição: ${posicaoTraduzida}\n📅 Dt. Nascimento: ${jogador.date_birth_at} ️\n⬆️ Altura: ${jogador.height}\n\n`;
                                      }
                                    }
                    
                                    if (listaMeioCampistas.length > 0) {
                                      listaJogadores += `⚽️ *MEIAS* ⚽️\n\n`;
                                      for (const jogador of listaMeioCampistas) {
                                        const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                                        listaJogadores += `*_${jogador.name.toUpperCase()}_*\n👕 Número da camisa: ${jogador.shirt_number}\n⚽️ Posição: ${posicaoTraduzida}\n📅 Dt. Nascimento: ${jogador.date_birth_at} ️\n⬆️ Altura: ${jogador.height}\n\n`;
                                      }
                                    }
                    
                                    if (listaAtacantes.length > 0) {
                                      listaJogadores += `⚡️ *ATACANTES* ⚡️\n\n`;
                                      for (const jogador of listaAtacantes) {
                                        const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                                        listaJogadores += `*_${jogador.name.toUpperCase()}_*\n👕 Número da camisa: ${jogador.shirt_number}\n⚽️ Posição: ${posicaoTraduzida}\n📅 Dt. Nascimento: ${jogador.date_birth_at} ️\n⬆️ Altura: ${jogador.height}\n\n`;
                                      }
                                    }
                    
                                    if (listaNaoDefinidos.length > 0) {
                                      listaJogadores += `❓ Jogadores não definidos ❓\n\n`;
                                      for (const jogador of listaNaoDefinidos) {
                                        const posicaoPrincipal = jogador.positions && jogador.positions.main && jogador.positions.main.length > 0 ? jogador.positions.main[0] : '';
                                        const posicaoTraduzida = await api.traduzirPosicao(posicaoPrincipal);
                                        listaJogadores += `*_${jogador.name.toUpperCase()}_*\n👕 Número da camisa: ${jogador.shirt_number}\n⚽️ Posição: ${posicaoTraduzida}\n📅 Dt. Nascimento: ${jogador.date_birth_at} ️\n⬆️ Altura: ${jogador.height}\n\n`;
                                      }
                                    }
                    
                                    client.reply(from, listaJogadores, id);
                                  } else {
                                    client.reply(from, 'Não foram encontrados jogadores para o time.', id);
                                  }
                                })
                                .catch((error) => {
                                  console.error('Erro ao buscar os jogadores do time:', error);
                                  client.reply(from, 'Não foi possível buscar os jogadores do time no momento.', id);
                                });
                            } else {
                              client.reply(from, 'Time não encontrado.', id);
                            }
                          })
                          .catch((error) => {
                            console.error('Erro ao buscar o time:', error);
                            client.reply(from, 'Não foi possível buscar o time no momento.', id);
                          });
                      }
                      break;
                    
                    






                      
                      
                        case '!infotime':
                            if (args.length < 2) {
                              client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !infotime <nomeTime>', id);
                            } else {
                              const nomeTime = args.slice(1).join(' ');
                              api.obterIDTime(nomeTime)
                                .then((data) => {
                                  const timesEncontrados = data.data.filter((time) => time.name.toLowerCase() === nomeTime.toLowerCase());
                                  if (timesEncontrados.length > 0) {
                                    const timeEncontrado = timesEncontrados[0];
                                    api.obterDadosDoTime(timeEncontrado.id)
                                      .then((data) => {
                                        if (data.data.length > 0) {
                                          const timeInfo = data.data[0];
                                          const resposta = `⚽️ Informações do time ${timeInfo.name} ⚽️\n\n🌍 País: ${timeInfo.country}\n🏟️ Estádio: ${timeInfo.venue.stadium.en}\n👥 Capacidade do estádio: ${timeInfo.venue.stadium_capacity}\n⚽️ Último jogo: ${timeInfo.last_match}\n⚽️ Próximo jogo: ${timeInfo.next_match}\n👨‍💼 Treinador: ${timeInfo.manager.name}`;
                                          client.sendFileFromUrl(from, timeInfo.logo, 'logo.png', resposta, id);
                                        } else {
                                          client.reply(from, '⚠️ Dados não encontrados.', id);
                                        }
                                      })
                                      .catch((error) => {
                                        console.error('Erro ao buscar o time:', error);
                                        client.reply(from, '⚠️ Não foi possível buscar o time no momento.', id);
                                      });
                                  } else {
                                    client.reply(from, '⚠️ Time não encontrado.', id);
                                  }
                                })
                                .catch((error) => {
                                  console.error('Erro ao buscar o time:', error);
                                  client.reply(from, '⚠️ Não foi possível buscar o time no momento.', id);
                                });
                            }
                            break;

                            case '!partidas':
                                if (args.length < 2) {
                                  client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !partidas <nomeTime>', id);
                                } else {
                                  const nomeTime = args.slice(1).join(' ');
                                  api.obterIDTime(nomeTime)
                                    .then((data) => {
                                      const timesEncontrados = data.data.filter((time) => time.name.toLowerCase() === nomeTime.toLowerCase());
                                      if (timesEncontrados.length > 0) {
                                        const timeEncontrado = timesEncontrados[0];
                                        api.obterJogosDoTime(timeEncontrado.id)
                                          .then((data) => {
                                            if (data.data.length > 0) {
                                              const jogos = data.data;

                                              const indexJogoFinalizado = jogos.findIndex((jogo) => jogo.status === 'finished');
                                                let ultimosJogos, proximosJogos;
                                                if (indexJogoFinalizado !== -1) {
                                                ultimosJogos = jogos.slice(Math.max(indexJogoFinalizado - 5, 0), indexJogoFinalizado);
                                                proximosJogos = jogos.slice(indexJogoFinalizado, indexJogoFinalizado + 5);
                                                } else {
                                                ultimosJogos = [];
                                                proximosJogos = jogos.slice(0, 5);
                                                }
                                              let listaJogos = `⚽️ Lista de jogos do time ${timeEncontrado.name} ⚽️\n\n`;
                              
                                              if (ultimosJogos.length > 0) {
                                                listaJogos += '🔚 Últimos jogos:\n';
                                                for (const jogo of ultimosJogos) {
                                                    const homeScore = jogo.home_score.normal_time;
                                                    const awayScore = jogo.away_score.normal_time;
                                                    listaJogos += `ID: ${jogo.id}\n⚽️Jogo: ${jogo.name}\n 📅 Data: ${jogo.start_at}\n🏆 Competição: ${jogo.season.name}\n👥 ${jogo.home_team.name} - ${homeScore}\n👥 ${jogo.away_team.name} - ${awayScore}\n\n\n`;
                                                }
                                              }
                              
                                              if (proximosJogos.length > 0) {
                                                listaJogos += '🔜 Próximos jogos:\n';
                                                for (const jogo of proximosJogos) {
                                                    listaJogos += `ID: ${jogo.id}\n⚽️Jogo: ${jogo.name}\n 📅 Data: ${jogo.start_at}\n🏆 Competição: ${jogo.season.name}\n👥 ${jogo.home_team.name}\n👥 ${jogo.away_team.name}\n\n`;
                                                }
                                              }
                              
                                              client.reply(from, listaJogos, id);
                                            } else {
                                              client.reply(from, 'Não foram encontrados jogos para o time.', id);
                                            }
                                          })
                                          .catch((error) => {
                                            console.error('Erro ao buscar os jogos do time:', error);
                                            client.reply(from, 'Não foi possível buscar os jogos do time no momento.', id);
                                          });
                                      } else {
                                        client.reply(from, 'Time não encontrado.', id);
                                      }
                                    })
                                    .catch((error) => {
                                      console.error('Erro ao buscar o time:', error);
                                      client.reply(from, 'Não foi possível buscar o time no momento.', id);
                                    });
                                }
                                break;

                            
                                case '!jogosdodia':
                                    if (args.length < 2) {
                                      client.reply(from, 'Uso incorreto! Utilize o comando da seguinte forma: !jogosdodia <data>', id);
                                    } else {
                                      const data = args[1]; // Obtém a data digitada pelo usuário
                                      try {
                                        const jogos = await api.obterJogosDaData(data);
                                  
                                        if (jogos.length > 0) {
                                          let resposta = `⚽️ Jogos do dia ${data} ⚽️\n\n`;
                                          for (const jogo of jogos) {
                                            resposta += `🏆 Liga: ${jogo.league.name}\n`;
                                            resposta += `🌍 País: ${jogo.section.name}\n`;
                                            resposta += `🏠 Time da Casa: ${jogo.home_team.name} - ${jogo.home_score.normal_time}\n`;
                                            resposta += `🏢 Time Visitante: ${jogo.away_team.name} - ${jogo.away_score.normal_time}\n`;
                                            resposta += `⚔️ Status: ${jogo.status}\n`;
                                          }
                                          client.reply(from, resposta, id);
                                        } else {
                                          client.reply(from, 'Nenhum jogo encontrado para a data especificada.', id);
                                        }
                                      } catch (error) {
                                        console.error('Erro ao buscar os jogos:', error);
                                        client.reply(from, 'Não foi possível buscar os jogos no momento.', id);
                                      }
                                    }
                                    break;

                              

                          








                //--------------------FUTEBOL--------------------         
            // obterCartasContraHu : async()=>{
            //     try {
            //         let github_gist_cartas = await axios.get("https://gist.githubusercontent.com/victorsouzaleal/bfbafb665a35436acc2310d51d754abb/raw/df5eee4e8abedbf1a18f031873d33f1e34ac338a/cartas.json")
            //         let cartas = github_gist_cartas.data, cartaPretaAleatoria = Math.floor(Math.random() * cartas.cartas_pretas.length), cartaPretaEscolhida = cartas.cartas_pretas[cartaPretaAleatoria], cont_params = 1
            //         if(cartaPretaEscolhida.indexOf("{p3}" != -1)){cont_params = 3}
            //         else if(cartaPretaEscolhida.indexOf("{p2}" != -1)) {cont_params = 2}
            //         else {cont_params = 1}
            //         for(i = 1; i <= cont_params; i++){
            //             let cartaBrancaAleatoria = Math.floor(Math.random() * cartas.cartas_brancas.length)
            //             let cartaBrancaEscolhida = cartas.cartas_brancas[cartaBrancaAleatoria]
            //             cartaPretaEscolhida = cartaPretaEscolhida.replace(`{p${i}}`, `*${cartaBrancaEscolhida}*`)
            //             cartas.cartas_brancas.splice(cartas.cartas_brancas.indexOf(cartaBrancaEscolhida, 1))
            //         }
            //         let frasePronta = cartaPretaEscolhida, resposta = criarTexto(msgs_texto.diversao.fch.resposta, frasePronta)
            //         return resposta
            //     } catch(err){
            //         consoleErro(err.message, "API obterCartasContraHu")
            //         throw new Error(msgs_texto.diversao.fch.erro_servidor)
            //     }
            // },
        }
    } catch (err) {
        throw err
    }
}