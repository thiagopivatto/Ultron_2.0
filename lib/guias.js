const cabecalho = "❔ USO DO COMANDO ❔\n\n"
module.exports = {
    info:{
        ajuda: cabecalho+
        "Ex: *!ajuda* - Exibe o menu de comandos gerais.",
        info: cabecalho+
        "Ex: *!info* - Exibe as informações do bot, dono, etc.",
        meusdados: cabecalho+
        "Ex: *!meusdados* - Exibe seus dados gerais como comandos, mensagens, tipo de usuário, etc.",
        reportar: cabecalho+
        "Ex: *!reportar* mensagem - Reporta uma mensagem para a administração do Bot.",
    },
    figurinhas: {
        s: cabecalho+
        "Ex: Envie/responda uma *imagem* com *!s* - Transforma a imagem em sticker.\n\n"+
        "Ex: Envie/responda uma *imagem* com *!s* 1 - Transforma a imagem em sticker circular.\n\n"+
        "*Obs*: Este comando funciona apenas com *IMAGENS*.",
        sgif: cabecalho+
        "Ex: Envie/responda um gif/video com *!sgif* - Transforma o gif/video em sticker animado.\n\n"+
        "Ex: Envie/responda um gif/video com *!sgif* 1 - Transforma o gif/video em sticker animado com as proporções originais.\n\n"+
        "Ex: Envie/responda um gif/video com *!sgif* 2 - Transforma o gif/video em sticker animado com formato circular.\n\n"+
        "*Obs*: Este comando funciona apenas com *GIFS/VIDEOS*.",
        ssf: cabecalho+
        "Ex: Envie/responda uma *imagem* com *!ssf* - Retira o fundo da imagem e transforma em sticker.\n\n"+
        "*Obs*: Este comando funciona apenas com *IMAGENS*.",
        tps: cabecalho+
        "Ex: *!tps* texto - Transforma o texto que você digitou em sticker.",
        atps: cabecalho+
        "Ex: *!atps* texto - Transforma o texto que você digitou em sticker animado.",
        simg: cabecalho+
        "Ex: Responda um sticker com *!simg* - Transforma o sticker em imagem.\n\n"+
        "*Obs*: Este comando funciona apenas com *STICKERS*.",
    },
    downloads: {
        play: cabecalho+
        "Ex: *!play* musica - Faz download de uma música do Youtube e envia como audio.",
        yt: cabecalho+
        "Ex: *!yt* titulo - Faz download de um video do Youtube com o titulo digitado e envia.",
        tw: cabecalho+
        "Ex: *!tw* link - Faz download de um video/imagem do Twitter pelo link digitado e envia.",
        tk: cabecalho+
        "Ex: *!tk* link - Faz download de um video do Tiktok pelo link digitado e envia.",
        fb: cabecalho+
        "Ex: *!fb* link - Faz download de um video do Facebook pelo link digitado e envia.",
        ig: cabecalho+
        "Ex: *!ig* link - Faz download de um video/foto do Instagram pelo link digitado e envia.",
        img: cabecalho+
        "Ex: *!img* tema - Envia 1 imagem com o tema que você digitar.\n\n"+
        "Ex: *!img* 5 tema - Envia 5 imagens com o tema que você digitar.",
    },
    utilidade : {
        tabela: cabecalho+
        "Ex: *!tabela* - Exibe a tabela de letras para criação de nicks.",
        audio: cabecalho+
        "Responda um aúdio com um desses comandos :\n\n"+
        "Ex: *!audio* grave - Torna audio mais grave e lento\n\n"+
        "Ex: *!audio* agudo - Torna o audio mais agudo e rapido\n\n"+
        "Ex: *!audio* estourar - Deixa o audio estourado\n\n"+
        "Ex: *!audio* volume  - Aumenta o volume em 4 vezes\n\n"+
        "Ex: *!audio* x2 - Acelera o audio em 2 vezes\n\n"+
        "Ex: *!audio* reverso - Reverte o audio\n\n"+
        "*Obs*: Este comando funciona apenas com *AUDIOS*.",
        traduz: cabecalho+
        "Ex: *!traduz* pt texto - Traduz o texto que foi digitado para *Português*.\n\n"+
        "Ex: *!traduz* en texto - Traduz o texto que foi digitado para *Inglês*.\n\n"+
        "Ex: Responda um *texto* com *!traduz* pt - Traduz o resto respondido para *Português*.\n\n"+
        "Ex: Responda um *texto* com *!traduz* en - Traduz o resto respondido para *Inglês*.\n\n"+
        "Idiomas suportados : \n"+
        "- 🇧🇷 Português (pt)\n"+
        "- 🇺🇸 Inglês (en)\n"+
        "- 🇯🇵 Japonês (ja)\n"+
        "- 🇮🇹 Italiano (it)\n"+
        "- 🇪🇸 Espanhol (es)\n"+
        "- 🇷🇺 Russo (ru)\n"+
        "- 🇰🇷 Coreano (ko)\n" +
        "- 🇫🇮 Finlandês (fi)\n" +
        "- 🇫🇷 Francês (fr)\n" +
        "- 🇩🇪 Alemão (de)\n",
        voz: cabecalho+
        "Ex: *!voz* pt-BR ; texto - Manda um audio falando o texto digitado com a voz do Google no idioma escolhido, neste caso Português-Brasil (se atente ao símbolo de ; após o idioma).\n\n"+
        "Ex: *!voz* texto - Manda um audio falando o texto digitado com a voz do Google no idioma padrão (pt-BR).\n\n"+
        "Ex: Responda um texto com *!voz* - Manda um audio falando o texto respondido com a voz do Google no idioma padrão (pt-BR).\n\n"+
        "Idiomas suportados : \n"+
        "- 🇦🇪 Árabe (ar-SA)\n" +
        "- 🇦🇷 Espanhol Argentino (es-AR)\n" +
        "- 🇦🇺 Inglês Australiano (en-AU)\n" +
        "- 🇦🇹 Alemão Austríaco (de-AT)\n" +
        "- 🇧🇪 Holandês Belga (nl-BE)\n" +
        "- 🇧🇷 Português Brasileiro (pt-BR)\n" +
        "- 🇨🇦 Inglês Canadense (en-CA)\n" +
        "- 🇨🇳 Chinês Mandarim (cmn-CN)\n" +
        "- 🇨🇿 Checo (cs-CZ)\n" +
        "- 🇩🇰 Dinamarquês (da-DK)\n" +
        "- 🇪🇬 Árabe Egípcio (ar-EG)\n" +
        "- 🇪🇸 Espanhol (es-ES)\n" +
        "- 🇫🇮 Finlandês (fi-FI)\n" +
        "- 🇫🇷 Francês (fr-FR)\n" +
        "- 🇩🇪 Alemão (de-DE)\n" +
        "- 🇬🇧 Inglês Britânico (en-GB)\n" +
        "- 🇭🇰 Chinês Hong Kong (yue-HK)\n" +
        "- 🇭🇺 Húngaro (hu-HU)\n" +
        "- 🇮🇳 Hindi (hi-IN)\n" +
        "- 🇮🇹 Italiano (it-IT)\n" +
        "- 🇯🇵 Japonês (ja-JP)\n" +
        "- 🇰🇷 Coreano (ko-KR)\n" +
        "- 🇲🇽 Espanhol Mexicano (es-MX)\n" +
        "- 🇳🇱 Holandês (nl-NL)\n" +
        "- 🇳🇴 Norueguês (nb-NO)\n" +
        "- 🇵🇱 Polonês (pl-PL)\n" +
        "- 🇵🇹 Português Europeu (pt-PT)\n" +
        "- 🇷🇺 Russo (ru-RU)\n" +
        "- 🇸🇪 Sueco (sv-SE)\n" +
        "- 🇨🇭 Alemão Suíço (de-CH)\n" +
        "- 🇹🇷 Turco (tr-TR)\n" +
        "- 🇺🇦 Ucraniano (uk-UA)\n" +
        "- 🇺🇸 Inglês Americano (en-US)",
        noticias: cabecalho+
        "Ex: *!noticias* - Exibe as notícias atuais.",
        noticiasus: cabecalho +
        "Ex: *!noticiasus* - Exibe as notícias atuais dos Estados Unidos.",
        letra: cabecalho+
        "Ex: *!letra* nome-musica - Exibe a letra da música que você digitou.",
        rastreio: cabecalho+
        "Ex: *!rastreio* PBXXXXXXXXXXX - Exibe o rastreio da encomenda dos correios que você digitou.",
        calc: cabecalho+
        "Ex: *!calc* 8x8 - Exibe o resultado do cálculo.\n\n"+
        "Ex: *!calc* 1mm em 1km - Exibe o resultado do conversão de medidas.",
        pesquisa: cabecalho+
        "Ex: *!pesquisa* tema - Faz uma pesquisa com o tema que você digitar.",
        moeda: cabecalho+
        "Ex: *!moeda* real 20 - Converte 20 reais para outras moedas\n\n"+
        "Ex: *!moeda* dolar 20 - Converte 20 dólares para outras moedas.\n\n"+
        "Ex: *!moeda* euro 20 - Converte 20 euros para outras moedas.",
        clima: cabecalho+
        "Ex: *!clima* Rio de Janeiro - Mostra o clima atual e dos próximos dias para o Rio de Janeiro.",
        ddd: cabecalho+
        "Ex: *!ddd* 11 - Exibe qual estado e região do DDD 11.\n\n"+
        "Ex: Responda com *!ddd* - Exibe qual estado e região do membro respondido.",
        ddi: cabecalho +
        "Ex: *!ddi* 0055 - Exibe qual o DDI do país com DDI 55.\n\n" +
        "Ex: Responda com *!ddi* - Exibe o país correspondente ao DDI digitado ou respondido.",
        anime:cabecalho+
        "Ex: Envie/responda uma imagem com *!anime* - Procura o anime pela imagem.\n\n"+
        "*Obs*: Este comando funciona apenas com *IMAGENS* e deve ser uma *CENA VÁLIDA DE ANIME*, *NÃO* podendo ser imagens com *baixa qualidade*, *wallpappers*, *imagens editadas/recortadas*.",
        animelanc: cabecalho+
        "Ex: *!animelanc* - Mostra os ultimos lançamentos de anime do site AnimesHouse.",
        qualmusica: cabecalho+
        "Ex: Envie/responda um audio/video com *!qualmusica* - Procura a música tocada no audio/video.\n\n"+
        "*Obs*: Este comando funciona apenas com *AUDIO/VIDEO*.",
        chat: cabecalho+
        "Ex: *!chat* - Responde utilizando o Chat GPT-3.\n\n"+
        "Ex: Responder com *!chat* - Responde utilizando o Chat GPT-3 com base na mensagem marcada.",
        dalle: cabecalho+
        "Ex: *!dalle* - Gera uma imagem através de inteligência artificial utilizando o DALL-E.\n\n"+
        "Ex: *!dalle* tema - Gera uma imagem através de inteligência artificial utilizando o DALL-E com o tema que você digitar ou marcar.",
    },
    grupo:{
        regras: cabecalho+
        "Ex: *!regras* - Exibe a descrição/regras do grupo",
        status: cabecalho+
        "Ex: *!status* - Exibe as configurações atuais do grupo",
        blista: cabecalho+
        "Ex: *!blista* +55119xxxx-xxxx - Adiciona o número digitado a lista negra do grupo.",
        dlista: cabecalho+
        "Ex: *!dlista* +55119xxxx-xxxx - Remove o número digitado da lista negra do grupo.",
        listanegra: cabecalho+
        "Ex: *!listanegra* - Exibe a lista negra do grupo.",
        destravar: cabecalho+
        "Ex: *!destravar* - Envia várias destravas no grupo.",
        bv: cabecalho+
        "Ex: *!bv*  - Liga/desliga a mensagem de bem-vindo para novos membros.\n\n"+
        "Ex: *!bv* [mensagem]  - Liga a mensagem de bem-vindo com uma mensagem da sua escolha.",
        aflood: cabecalho+
        "Ex: *!aflood*  - Liga/desliga o anti-flood.\n\n"+
        "Ex: *!aflood* 5 15  - Maxímo de mensagens fica 5 mensagens a cada 15 segundos.",
        afake: cabecalho+
        "Ex: *!afake* - Liga/desliga o anti-fake em grupos.\n"+
        "Ex: *!afake* DDI - Configura o anti-fake para que todos números com o DDI exterior seja banido, exceto o que você escolheu.\n"+
        "Ex: *!afake* DDI1 DDI2 DDI3 - Configura o anti-fake para que todos números com DDI exterior sejam banidos, excetos o que você escolheu.\n\n"+
        "*Obs*: A ativação do anti-fake bane pessoas com DDI do exterior (que não sejam 55 - Brasil).",
        alink: cabecalho+
        "Ex: *!alink* - Liga/desliga o antilink e bane quem postar qualquer tipo de link.\n\n"+
        "Ex: *!alink* twitter facebook youtube whatsapp - Liga o antilink e bane quem postar link que não seja do Twitter, Facebook, Youtube ou WhatsApp.",
        atrava: cabecalho+
        "Ex: *!atrava* - Liga/desliga o anti-trava para no máximo 1500 caracteres por mensagem.\n\n"+
        "Ex : *!atrava* 500 - Configura o anti-trava para no máximo 500 caracteres por mensagem.",
        aporno: cabecalho+
        "Ex: *!aporno* - Liga/desliga o anti-pornô em imagens.\n\n"+
        "*Obs*: A ativação do anti-pornô pode tornar o anti-flood mais lento pois há uma checagem em cada imagem.",
        mutar: cabecalho+
        "Ex: *!mutar* - Liga/desliga a execução de comandos dos membros.",
        autosticker: cabecalho+
        "Ex: *!autosticker* - Liga/desliga a criação automatica de stickers sem precisar de comandos.",
        add: cabecalho+
        "Ex: *!add* 5511xxxxxxxxx - Digite o numero com o código do país para adicionar a pessoa.\n\n"+
        "Ex: *!add* 5511xxxxxxxxx, 5511xxxxxxxxx - Digite os numeros com o código do país (adiciona mais de uma pessoa no grupo).",
        ban: cabecalho+
        "Ex: *!ban* @membro - Para banir um membro marcando ele.\n\n"+
        "Ex: Responder alguém com *!ban* - Bane a pessoa que você respondeu.",
        rlink: cabecalho+
        "Ex: *!rlink* - Redefine o link do grupo.",
        contador: cabecalho+
        "Ex: *!contador* - Liga/desliga a contagem de mensagens no grupo.",
        atividade:cabecalho+
        "Ex: *!atividade* @membro - Mostra a atividade do membro mencionado.\n\n"+
        "Ex: Responder com *!atividade* - Mostra a atividade do membro que você respondeu.\n\n"+
        "*Obs*: Este comando só funciona com o *!contador* ativado.",
        alterarcont:cabecalho+
        "Ex: *!alterarcont* @membro 50 - Altera a quantidade de mensagens de um membro mencionado para 50 mensagens.\n\n"+
        "Ex: Responder com *!alterarcont* 20 - Altera a quantidade de mensagens do membro que você respondeu para 20 mensagens.\n\n"+
        "*Obs*: Este comando só funciona com o *!contador* ativado.",
        imarcar:cabecalho+
        "Ex: *!imarcar* 5 - Marca todos os membros com menos de 5 mensagens.\n\n"+
        "*Obs*: Este comando só funciona com o *!contador* ativado.",
        ibanir:cabecalho+
        "Ex: *!ibanir* 10 - Bane todos os membros com menos de 10 mensagens.\n\n"+
        "*Obs*: Este comando só funciona com o *!contador* ativado.",
        topativos:cabecalho+
        "Ex: *!topativos* 10 - Marca os 10 membros com mais mensagens do grupo.\n\n"+
        "*Obs*: Este comando só funciona com o *!contador* ativado.",
        enquete:cabecalho+
        "Ex: *!enquete* tema,opcao1,opcao2,opcao3 - Cria uma enquete com um tema e as opções de voto.\n\n"+
        "*Obs*: Digite *!enquete* novamente para encerrar uma enquete aberta e exibir os resultados finais dela.",   
        votarenquete:cabecalho+
        "Ex: *!votarenquete* 1 - Vota na opção 1 da enquete.\n\n"+
        "*Obs*: Este comando só funciona com uma enquete em aberto.",
        verenquete: cabecalho+
        "Ex: *!verenquete* - Mostra se há alguma enquete em aberto.",
        votacao: cabecalho+
        "Ex: *!votacao* - Mostra se há alguma votação de ban em aberto.",
        fotogrupo: cabecalho+
        "Ex: Envie/responda uma *imagem* com *!fotogrupo* - Altera a foto do grupo.\n\n",
        votar: cabecalho+
        "Ex: *!votar* - Vota no membro que está em votação.",
        vb: cabecalho+
        "Ex: *!vb* @membro 10 - Abre uma votação de ban em um membro com limite de 10 votos.\n\n"+
        "*Obs*: Digite *!vb* novamente para encerrar uma votação aberta.",
        bcmd: cabecalho+
        "Ex: *!bcmd* !s !sgif !play - Bloqueia no grupo os comandos !s, !sgif e !play (você pode escolher os comandos a sua necessidade).\n\n"+
        "Ex: *!bcmd* figurinhas - Bloqueia todos os comandos da categoria FIGURINHAS.\n\n"+
        "Ex: *!bcmd* utilidades - Bloqueia todos os comandos da categoria UTILIDADES.\n\n"+
        "Ex: *!bcmd* downloads - Bloqueia todos os comandos da categoria DOWNLOADS.\n\n"+
        "Ex: *!bcmd* diversão - Bloqueia todos os comandos da categoria DIVERSÃO.\n\n"+
        "*Obs* : Você não pode bloquear comandos de administrador.",
        dcmd: cabecalho+
        "Ex: *!dcmd* !s !sgif !play - Desbloqueia no grupo os comandos !s, !sgif e !play.\n\n"+
        "Ex: *!dcmd* todos - Desbloqueia todos os comandos.\n\n"+
        "Ex: *!dcmd* figurinhas - Desbloqueia todos os comandos da categoria FIGURINHAS.\n\n"+
        "Ex: *!dcmd* utilidades - Desbloqueia todos os comandos da categoria UTILIDADES.\n\n"+
        "Ex: *!dcmd* downloads - Desbloqueia todos os comandos da categoria DOWNLOADS.\n\n"+
        "Ex: *!dcmd* diversão - Desbloqueia todos os comandos da categoria DIVERSÃO.\n\n"+
        "*Obs* : Verifique os comandos que estão bloqueados com *!status*.",
        link: cabecalho+
        "Ex: *!link* - Exibe o link do grupo.",
        adms:  cabecalho+
        "Ex: *!adms* - Exibe e marca os administradores do grupo.",
        dono:  cabecalho+
        "Ex: *!dono* - Exibe e marca o dono do grupo.",
        mt: cabecalho+
        "Ex: *!mt* - Marca todos os *MEMBROS/ADMIN* do grupo.\n\n"+
        "Ex: *!mt* mensagem - Marca todos os *MEMBROS/ADMIN* do grupo com uma mensagem.",
        mm: cabecalho+
        "Ex: *!mm* - Marca todos os *MEMBROS* do grupo.\n\n"+
        "Ex: *!mm* mensagem - Marca todos os *MEMBROS* do grupo com uma mensagem.",
        bantodos: cabecalho+
        "Ex: *!bantodos* - Bane todos os membros do grupo.\n\n"+
        "*Obs* : Apenas o dono do grupo pode usar este comando.",
        promover: cabecalho+
        "Ex: *!promover* @membro - Promove o membro mencionado a *ADMINISTRADOR*.\n\n"+
        "Ex: Responder com *!promover* - Promove o usuário respondido a *ADMINISTRADOR*.",
        rebaixar: cabecalho+
        "Ex: *!rebaixar* @admin - Rebaixa o administrador mencionado a *MEMBRO*.\n\n"+
        "Ex: Responder com *!rebaixar* - Rebaixa o administrador respondido a *MEMBRO*.",
        apg: cabecalho+
        "Ex: Responder com *!apg* - Apaga a mensagem do bot que foi respondida com esse comando.\n\n"+
        "*Obs* : Só é possivel apagar as mensagens do bot.",
        f: cabecalho+
        "Ex: *!f* - Abre/Fecha o grupo."
    },
    diversao:{
        detector:cabecalho+
        "Ex: Responder com *!detector* - Exibe o resultado da máquina da verdade.",
        viadometro:cabecalho+
        "Ex: *!viadometro* @membro - Mede o nível de viadagem do membro mencionado.\n\n"+
        "Ex: Responder com *!viadometro* - Mede o nível de viadagem do membro respondido.",
        bafometro: cabecalho+
        "Ex: *!bafometro* @membro - Mede o nível de alcool do membro mencionado.\n\n"+
        "Ex: Responder com *!bafometro* - Mede o nível de alcool do membro respondido.",
        jacometro: cabecalho+
        "Ex: *!jacometro* @membro - Mede o nível de Jacó do membro mencionado.\n\n"+
        "Ex: Responder com *!jacometro* - Mede o nível de Jacó do membro respondido.",
        bolametro: cabecalho+
        "Ex: *!bolametro* @membro - Mede o nível de bola do membro mencionado.\n\n"+
        "Ex: Responder com *!bolametro* - Mede o nível de bola do membro respondido.",
        fernandometro: cabecalho+
        "Ex: *!fernandometro* @membro - Mede o nível de Fernando do membro mencionado.\n\n"+
        "Ex: Responder com *!fernando* - Mede o nível de Fernando do membro respondido.",
        caracoroa: cabecalho+
        "Ex: *!caracoroa* - Decisão no cara ou coroa, exibe o lado da moeda que cair.",
        ppt: cabecalho+
        "Ex: *!ppt* pedra - Escolhe pedra, para jogar pedra, papel ou tesoura.\n\n"+
        "Ex: *!ppt* papel - Escolhe papel, para jogar pedra, papel ou tesoura.\n\n"+
        "Ex: *!ppt* tesoura - Escolhe tesoura, para jogar pedra, papel ou tesoura.",
        top:cabecalho+
        "Ex: *!top* número tema - Exibe uma ranking de X membros aleatórios com o tema que você escolher.",
        mascote:cabecalho+
        "Ex: *!mascote* - Exibe o mascote do BOT.",
        roletarussa: cabecalho+
        "Ex: *!roletarussa* - Bane um membro aleatório do grupo.\n\n"+
        "*Obs*: Comando apenas para administradores, pode banir qualquer um exceto o dono do grupo e o BOT.",
        casal: cabecalho+
        "Ex: *!casal* - Escolhe 2 pessoas aleatórias do grupo para formar um casal.",
        par: cabecalho+
        "Ex: *!par* @membro1 @membro2 - Mede o nível de compatibilidade dos 2 membros mencionados.",
        trisal: cabecalho +
        "Ex: *!trisal* @membro1 @membro2 @membro3 - Mede o nível de compatibilidade dos 3 membros mencionados.",
        fch: cabecalho+
        "Ex: *!fch* - Exibe uma frase aleatória montada com as cartas do jogo Cartas contra a Humanidade.",
    },
    admin:{
        admin: cabecalho+
        "Ex: *!admin* - Exibe o menu de administração do Bot.",
        grupos: cabecalho+
        "Ex: *!grupos* - Mostra os grupos atuais que o bot está e suas informações.",
        fotobot: cabecalho+
        "Ex: Envie/responda uma *imagem* com *!fotobot* - Altera a foto do BOT.\n\n",
        infocompleta: cabecalho+
        "Ex: *!infocompleta* - Exibe as informações completas do bot, inclusive as configurações atuais.",
        alternarcron: cabecalho+
        "Ex: *!alternarcron* - Habilita ou desabilita o cron para limpar as mensagens do bot.",
        entrargrupo:cabecalho+
        "Ex: *!entrargrupo* link - Entra em um grupo por link de convite.",
        sair:cabecalho+
        "Ex: *!sair* - Faz o bot sair do grupo.",
        listablock:cabecalho+
        "Ex: *!listablock* - Exibe a lista de usuários bloqueados pelo bot.",
        limpartudo:cabecalho+
        "Ex: *!limpartudo* - Limpa todos os chats (Grupos e Contatos).",
        bcmdglobal:cabecalho+
        "Ex: *!bcmdglobal* !s !sgif !play - Bloqueia  os comandos !s, !sgif e !play (você pode escolher os comandos a sua necessidade).\n\n"+
        "Ex: *!bcmdglobal* figurinhas - Bloqueia todos os comandos da categoria FIGURINHAS.\n\n"+
        "Ex: *!bcmdglobal* utilidades - Bloqueia todos os comandos da categoria UTILIDADES.\n\n"+
        "Ex: *!bcmdglobal* downloads - Bloqueia todos os comandos da categoria DOWNLOADS.\n\n"+
        "Ex: *!bcmdglobal* diversão - Bloqueia todos os comandos da categoria DIVERSÃO.\n\n"+
        "*Obs* : Você não pode bloquear comandos de administrador.",
        dcmdglobal:cabecalho+
        "Ex: *!dcmdglobal* !s !sgif !play - Desbloqueia  os comandos !s, !sgif e !play.\n\n"+
        "Ex: *!dcmdglobal* todos - Desbloqueia todos os comandos.\n\n"+
        "Ex: *!dcmdglobal* figurinhas - Desbloqueia todos os comandos da categoria FIGURINHAS.\n\n"+
        "Ex: *!dcmdglobal* utilidades - Desbloqueia todos os comandos da categoria UTILIDADES.\n\n"+
        "Ex: *!dcmdglobal* downloads - Desbloqueia todos os comandos da categoria DOWNLOADS.\n\n"+
        "Ex: *!dcmdglobal* diversão - Desbloqueia todos os comandos da categoria DIVERSÃO.\n\n"+
        "*Obs* : Verifique os comandos que estão bloqueados com !infocompleta.",
        autostickerpv: cabecalho+
        "Ex: *!autostickerpv* - Liga/desliga a criação automatica de stickers sem precisar de comandos no privado.",
        pvliberado: cabecalho+
        "Ex: *!pvliberado* - Liga/desliga os comandos em MENSAGENS PRIVADAS.",
        antitravapv: cabecalho+
        "Ex: *!antitravapv* - Liga/desliga o anti-trava no privado para no máximo 1500 caracteres por mensagem.\n\n"+
        "Ex : *!antitravapv* 500 - Configura o anti-trava no privado para no máximo 500 caracteres por mensagem.",
        limpar: cabecalho+
        "Ex: *!limpar* - Limpa todos os chats de contatos.",
        rconfig: cabecalho+
        "Ex: *!rconfig* - Reseta a configuração de todos os grupos.",
        sairgrupos: cabecalho+
        "Ex: *!sairgrupos* - Sai de todos os grupos.",
        bloquear: cabecalho+
        "Ex: *!bloquear* @membro - Para o bot bloquear o membro mencionado.\n\n"+
        "Ex: *!bloquear* +55 (xx) xxxxx-xxxx - Para o bot bloquear o número digitado.\n\n"+
        "Ex: Responder alguém com *!bloquear* - Para o bot bloquear o membro que você respondeu.",
        desbloquear: cabecalho+
        "Ex: *!desbloquear* @membro - Para o bot desbloquear o membro mencionado.\n\n"+
        "Ex: *!desbloquear* +55 (xx) xxxxx-xxxx - Para o bot desbloquear o número digitado.\n\n"+
        "Ex: Responder alguém com *!desbloquear* - Para o bot desbloquear o membro que você respondeu.",
        usuarios: cabecalho+
        "Ex: *!usuarios* bronze - Mostra todos os usuários do tipo *BRONZE*.\n\n"+
        "*Obs*: Use o *!tipos* para ver os tipos disponíveis de usuários.",
        limitediario: cabecalho+
        "Ex: *!limitediario* - Ativa/desativa o limite diario de comandos.",
        taxalimite: cabecalho+
        "Ex: *!taxalimite* 5 60 - Ativa a taxa limite de comandos para 5 comandos a cada minuto por usuário, caso o usuário ultrapasse ele fica 60 segundos impossibilitado de fazer comandos.\n\n"+
        "*Obs*: Digite *!taxalimite* novamente para desativar a taxa limite de comandos.",
        limitarmsgs: cabecalho+
        "Ex: *!limitarmsgs* 10 10 - Ativa o limite de mensagens privadas em 10 mensagens a cada 10 segundos, se o usuário ultrapassar ele será bloqueado.\n\n"+
        "*Obs*: Digite *!limitarmsgs* novamente para desativar o limite de mensagens privadas.",
        tipos: cabecalho+
        "Ex: *!tipos* - Exibe os tipos de usuários disponíveis e quantos comandos estão configurados por dia.",
        limpartipo: cabecalho+
        "Ex: *!limpartipo* ouro - Transforma todos os usuários do tipo *OURO* em *BRONZE*.\n\n"+
        "*Obs*: Use o *!tipos* para ver os tipos disponíveis de usuários.",
        mudarlimite: cabecalho+
        "Ex: *!mudarlimite* bronze 50 - Altera o limite diário de comandos do usuário *BRONZE* para 50/dia.\n\n"+
        "*Obs*: O comando de *!limitediario* deve estar ativado.\n"+
        "*Obs²*: Verifique os tipos disponíveis de usuários em *!tipos*.\n"+
        "*Obs³*: Para ficar sem limite de comandos digite -1 no campo de limite.",
        alterartipo: cabecalho+
        "Ex: *!alterartipo* ouro @usuario - Altera o tipo do usuário mencionado para *OURO*.\n\n"+
        "Ex: Responder com *!alterartipo* bronze - Altera o tipo do usuário respondido para *BRONZE*.\n\n"+
        "Ex: *!alterartipo* prata  55119xxxxxxxx - Altera o tipo do usuário do número para *PRATA*.\n\n"+
        "*Obs*: Use o *!tipos* para ver os tipos disponíveis de usuários.",
        rtodos: cabecalho+
        "Ex: *!rtodos* - Reseta os comandos diários de todos os usuários.\n\n"+
        "*Obs*: O comando de *!limitediario* deve estar ativado.",
        r: cabecalho+
        "Ex: *!r* @usuario - Reseta os comandos diários de um usuário mencionado.\n\n"+
        "Ex: Responder com *!r* - Reseta os comandos diários do usuário respondido.\n\n"+
        "Ex: *!r* 55219xxxxxxxx - Reseta os comandos diários do usuário com esse número.\n\n"+
        "*Obs*: O comando de *!limitediario* deve estar ativado.",
        verdados:cabecalho+
        "Ex: *!verdados* @usuario - Mostra os dados gerais do usuário mencionado.\n\n"+
        "Ex: Responder com *!verdados* - Mostra os dados gerais do usuário respondido.\n\n"+
        "Ex: *!verdados* 55119xxxxxxxx - Mostra os dados gerais do usuário com esse número.",
        bctodos: cabecalho+
        "Ex: *!bctodos* mensagem - Envia uma mensagem para todos os *GRUPOS E CONTATOS*.",
        bcgrupos: cabecalho+
        "Ex: *!bcgrupos* mensagem - Envia uma mensagem para todos os *GRUPOS*.",
        bccontatos: cabecalho+
        "Ex: *!bccontatos* mensagem - Envia uma mensagem para todos os *CONTATOS*.",
        print: cabecalho+
        "Ex: *!print* - Tira uma print do WhatsApp Web do BOT e envia.",
        estado: cabecalho+
        "Ex: *!estado* online - Muda o status do bot para ONLINE.\n\n"+
        "Ex: *!estado* offline - Muda o status do bot para OFFLINE.\n\n"+
        "Ex: *!estado* manutencao - Muda o status do bot para MANUTENCÃO.",
        desligar: cabecalho+
        "Ex: *!desligar* - Desliga o BOT.",
        ping: cabecalho+
        "Ex: *!ping* - Exibe as informações do sistema do BOT e o tempo de resposta dele.",
        membroinfo: cabecalho+
        "Ex: *!membroinfo* - Exibe as informações do membro marcado."
    },

}