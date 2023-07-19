const prompt = require("prompt")
const fs = require('fs-extra')
const path = require('path')

//NÃO MODIFICAR ESSA PARTE, O .ENV CORRETO ESTÁ NA RAIZ DO PROJETO!!!!!!!!!!!!!!!!
module.exports = {
    criacaoEnv: async ()=>{
        const {corTexto} = require(path.resolve("lib/util.js"))
        let schema = {
            properties: {
               numero_dono:{
                 description: corTexto("Digite seu número de WhatsApp com o código do país incluído - ex: 55219xxxxxxxx.(O SEU NÚMERO E NÃO O DO BOT) "),
                 required: true
               },
            }
         }
         const {numero_dono} = await prompt.get(schema)
         const env = "#############  DADOS DO BOT #############\n\n"+
         "NOME_ADMINISTRADOR=Thiago\n"+
         "NOME_BOT=Ultron\n"+
         "NOME_AUTOR_FIGURINHAS = Ultron\n\n"+
         "############ CONFIGURAÇÕES DO BOT #############\n\n"+
         "# LEMBRE-SE SEU NÚMERO DE WHATSAPP E NÃO O DO BOT. (COM CÓDIGO DO PAÍS INCLUÍDO)\n"+
         "NUMERO_DONO="+numero_dono+"\n"+
         "# NEWSAPI- Coloque abaixo sua chave API do site newsapi.org (NOTICIAIS ATUAIS)\n"+
         "API_NEWS_ORG=??????\n"+
         "# ACRCLOUD - Coloque abaixo suas chaves do ACRCloud (Reconhecimento de Músicas)\n"+
         "acr_host=??????\n"+
         "acr_access_key=??????\n"+
         "acr_access_secret=??????\n"+
         "# DEEPAI- Coloque abaixo sua chave do deepai.org (Detector de nudez/pornografia)\n"+
         "API_DEEPAI=??????\n"
         "# OPENAI- Coloque abaixo sua chave da OpenAI (Chat GPT)\n"+
         "OPENAI_API_KEY=??????\n"+
         "# GOOGLE CLOUD- Coloque abaixo sua chave do Google Cloud\n"+
         "GOOGLE_CLIENT_EMAIL=??????\n"+
         "GOOGLE_PRIVATE_KEY=??????\n"+
         "# GOOGLE CLOUD TTS- Coloque abaixo sua chave do Google Cloud TTS\n"+
         "GOOGLE_CLIENT_EMAIL_TTS=??????\n"+
         "GOOGLE_PRIVATE_KEY_TTS=??????\n"+
         "# SIMSIMI - Coloque abaixo sua chave do SimSimi (Chatbot)"+
         "SIMSIMI_API_KEY=??????\n"+
         "# REPLICATE - Coloque abaixo sua chave do Replicate (Chatbot)"+
         "REPLICATE_API_TOKEN=??????\n\n"+
         "# ALPHAVANTAGE - Coloque abaixo sua chave do Alphavantage (Cotação de moedas)"+
         "ALPHAVANTAGE_API_KEY=??????\n\n"+
         "# X_RAPIDAPI_KEY - Coloque abaixo sua chave do X_RapidAPI (Dados Esportes)"+
         "X_RAPIDAPI_KEY=??????\n"+
         "X_RAPIDAPI_HOST=??????\n\n"+

         await fs.writeFile(path.resolve('.env'), env , 'utf8')
    },

    //NÃO MODIFICAR ESSA PARTE, O .ENV CORRETO ESTÁ NA RAIZ DO PROJETO!!!!!!!!!!!!!!!!
    verificarEnv:()=>{
        const {corTexto} = require(path.resolve("lib/util.js"))
        let resposta = {
            numero_dono : {
               resposta: (process.env.NUMERO_DONO.trim() == "55219xxxxxxxx") ? "O número do DONO ainda não foi configurado" : "✓ Número do DONO configurado.",
               cor_resposta: (process.env.NUMERO_DONO.trim() == "55219xxxxxxxx") ? "#d63e3e" : false
            },
            newsapi : {
              resposta: (process.env.API_NEWS_ORG.trim() == "??????") ? "A API do NEWSAPI ainda não foi configurada" : "✓ API NEWSAPI Configurada.",
              cor_resposta: (process.env.API_NEWS_ORG.trim() == "??????") ? "#d63e3e" : false
            },
            acrcloud :{
              resposta: (process.env.acr_host.trim() == "??????" || process.env.acr_access_key.trim() == "??????" || process.env.acr_access_secret.trim() == "??????")
               ? "A API do ACRCloud ainda não foi configurada corretamente" : "✓ API ACRCloud Configurada.",
              cor_resposta: (process.env.acr_host.trim() == "??????" || process.env.acr_access_key.trim() == "??????" || process.env.acr_access_secret.trim() == "??????")
              ? "#d63e3e" : false
            },
            deepai : {
              resposta: (process.env.API_DEEPAI.trim() == "??????") ? "A API do DEEPAI ainda não foi configurada" : "✓ API DEEPAI Configurada.",
              cor_resposta: (process.env.API_DEEPAI.trim() == "??????") ? "#d63e3e" : false
            },
            openai : {
              resposta: (process.env.OPENAI_API_KEY.trim() == "??????") ? "A API da OPENAI ainda não foi configurada" : "✓ API OPENAI Configurada.",
              cor_resposta: (process.env.OPENAI_API_KEY.trim() == "??????") ? "#d63e3e" : false
            },
            googlecloud : {
              resposta: (process.env.GOOGLE_CLIENT_EMAIL.trim() == "??????" || process.env.GOOGLE_PRIVATE_KEY.trim() == "??????") ? "A API do GOOGLE CLOUD ainda não foi configurada" : "✓ API GOOGLE CLOUD Configurada.",
              cor_resposta: (process.env.GOOGLE_CLIENT_EMAIL.trim() == "??????" || process.env.GOOGLE_PRIVATE_KEY.trim() == "??????") ? "#d63e3e" : false
            },
            googlecloudtts : {
              resposta: (process.env.GOOGLE_CLIENT_EMAIL_TTS.trim() == "??????" || process.env.GOOGLE_PRIVATE_KEY_TTS.trim() == "??????") ? "A API do GOOGLE CLOUD TTS ainda não foi configurada" : "✓ API GOOGLE CLOUD TTS Configurada.",
              cor_resposta: (process.env.GOOGLE_CLIENT_EMAIL_TTS.trim() == "??????" || process.env.GOOGLE_PRIVATE_KEY_TTS.trim() == "??????") ? "#d63e3e" : false
            },
            simsimi : {
              resposta: (process.env.SIMSIMI_API_KEY.trim() == "??????") ? "A API do SIM SIMI ainda não foi configurada" : "✓ API SIM SIMI Configurada.",
              cor_resposta: (process.env.SIMSIMI_API_KEY.trim() == "??????") ? "#d63e3e" : false
            },
            replicate : {
              resposta: (process.env.REPLICATE_API_TOKEN.trim() == "??????") ? "A API do REPLICATE ainda não foi configurada" : "✓ API REPLICATE Configurada.",
              cor_resposta: (process.env.REPLICATE_API_TOKEN.trim() == "??????") ? "#d63e3e" : false
            },
            alphavantage : {
              resposta: (process.env.ALPHAVANTAGE_API_KEY.trim() == "??????") ? "A API do ALPHAVANTAGE ainda não foi configurada" : "✓ API ALPHAVANTAGE Configurada.",
              cor_resposta: (process.env.ALPHAVANTAGE_API_KEY.trim() == "??????") ? "#d63e3e" : false
            },
            xrapid : {
              resposta: (process.env.X_RAPIDAPI_KEY.trim() == "??????" || process.env.X_RAPIDAPI_HOST.trim() == "??????") ? "A API do X_RAPIDAPI_KEY ainda não foi configurada" : "✓ API X_RAPIDAPI_KEY Configurada.",
              cor_resposta: (process.env.X_RAPIDAPI_KEY.trim() == "??????" || process.env.X_RAPIDAPI_HOST.trim() == "??????") ? "#d63e3e" : false
            },

          }
      
          console.log("[ENV]", corTexto(resposta.numero_dono.resposta, resposta.numero_dono.cor_resposta))
          console.log("[ENV]", corTexto(resposta.newsapi.resposta, resposta.newsapi.cor_resposta))
          console.log("[ENV]", corTexto(resposta.acrcloud.resposta, resposta.acrcloud.cor_resposta))
          console.log("[ENV]", corTexto(resposta.deepai.resposta, resposta.deepai.cor_resposta))
          console.log("[ENV]", corTexto(resposta.openai.resposta, resposta.openai.cor_resposta))
          console.log("[ENV]", corTexto(resposta.googlecloud.resposta, resposta.googlecloud.cor_resposta))
          console.log("[ENV]", corTexto(resposta.googlecloudtts.resposta, resposta.googlecloudtts.cor_resposta))
          console.log("[ENV]", corTexto(resposta.simsimi.resposta, resposta.simsimi.cor_resposta))
          console.log("[ENV]", corTexto(resposta.replicate.resposta, resposta.replicate.cor_resposta))
          console.log("[ENV]", corTexto(resposta.alphavantage.resposta, resposta.alphavantage.cor_resposta))
          console.log("[ENV]", corTexto(resposta.xrapid.resposta, resposta.xrapid.cor_resposta))
    }
}