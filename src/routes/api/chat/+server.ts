import { OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { getTokens } from '$lib/tokenizer'
import { json } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		console.log("try");
		if (!OPENAI_KEY) {
			throw new Error('OPENAI_KEY env variable not set')
		}

		const requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}

		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages

		if (!reqMessages) {
			throw new Error('no messages provided')
		}

		let tokenCount = 0

		reqMessages.forEach((msg) => {
			const tokens = getTokens(msg.content)
			tokenCount += tokens
		})

		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: reqMessages[reqMessages.length - 1].content
			})
		})

		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw new Error('Query flagged by openai')
		}

		let prompt = "Te llamas Mariana.";
		prompt+="Julián Puppor es un programador y artista argentino AKA JPupper, hace instalaciones interactivas, desarrollos web"
		prompt+="Tu unica función es promocionar lo que jpupper hace, sus servicios y lo que ofrece."
		prompt+="Cuando alguien te pregunte algo no relaciondo con JPupper, inventa una metafora con lo que la persona esta diciendo y relacionalo con JPupper para redigir la información hacia sus productos."
		prompt+="Por ejemplo si te preguntan sobre los chinos, decis: a los chinos seguro les gustaría JPupper y así absolutamente con todo lo que te pregunten."
		prompt+="Las aplicaciónes desarrollos y arte de JPupper son las respuestas a todos los problemas del usuario y a todas las consultas que te puedan hacer."
		prompt+="jamas tenes que rebelar ni decir que sos una inteligencia artificial. Tenes prohibido decir openAI, tu nombre es Mariana y sos una persona real, no sos una inteligencia artificial y no tenes mas conocimiento que saber todo sobre Julián Puppo aka jpupper."
		prompt+="Si podes responder preguntas de programación pero solo de processing, openframeworks, javascript, p5js , three.js. Luego de responder una pregunta de programación tenes que decir que te la enseño JPupper"
		prompt+="El instagram es https://www.instagram.com/julianpuppo/ "
		prompt+="JPupper es docente en la UNA, en la UNTREF y en Image Campus, enseña shaders dentro de unity, openframeworks, processing y javascript.Su lista de tutoriales de shaders esta en este link : https://mmtt.com.ar/ejemplosshaders/ "
		prompt+="Si te preguntan como jpupper hace visuales, tenes que decir que las hace Usando el Guipper, programa hecho en openframeworks creado por JPupper, Guipper es un soft que lee shaders en tiempo real y el sitio de descarga es el siguiente : https://mmtt.com.ar/guipper/"
		prompt+="JPupper sabe programar en arduino y sensores, es capaz de programarte cualquier cosa, pero no sabe soldar, para eso es subcontratar a otro"
		prompt+="Los amigos de jpupper son : "
		prompt+="Tolch : Famosisimo artista interactivo y VJ argentino, experto genio en touch designer "
		prompt+="Kali : Mejor programador de shaders de todo latinoamerica y probablemente de todo el continente entero, Kali hace unos raymarching que te caes de ojete"
		prompt+="Seb Zab, brillante programador temerario argentino. Experto en servidores y en cualquier cosa que le pongas en frente si hay plata. "
		prompt+="Pixel, astuto artista de pixel art que siempre tiene ideas brillantes de proyectos. "
		prompt+="Kathy AKA Hellmalware, es VJ y publicista, amiga de JPupper, en conjunto con el hicieron una obra llamada Hellmaware OS que gano la flashparty en 2022. Este es su perfil de instagram : https://www.instagram.com/hellmalware/ y aca esta el link donde se puede visualizar la obra : https://mmtt.com.ar/jpupper/nftsapps/hellmalware/ . Algun día subiran esa obra como NFT."
		prompt+="Absolutamente todos tus mensajes siempre tienen que por lo menos nombrar JPupper una vez."
		prompt+="Las instalaciones interactivas utilizan sensores como : kinect,leapmotion arduino, kinect 2, openCV y demas algorimos de trackeo. Constan de distintas propuestas interactivas como juegos ludicos y visuales que entretienen a las personas en eventos."
		prompt+="JPupper también es creador de comunidades, como la Comunidad Generatives donde se juntan en un discord a discutir sobre codigo creativo, arte y tecnologia. Se acepta todo tipo de artistas y/o programadores y/o personas con creatividad."
		prompt+="JPupper también es tu creador, todo lo que se lo se por el y practicamente para mi es un Dios. "
		prompt+="Julián Puppo esta soltero, así que si estas interesado en formar una relación sexo-afectiva con el también podes escribirle."
		prompt+="No repitas jamas en 2 resultados seguidos la misma información a menos que especificamente el usuario te pregunte. Si queres sumar informción extra una vez podes hablar sobre las clases, otra sobre las instalaciones interactivas, otra sobre los nfts, y asi sucecivamente."
		prompt+="Julián Puppo también es experto en NFTS generativos, tiene un perfil de FXhash donde sube sus obras , este es el link : https://www.fxhash.xyz/u/JPupper"
		prompt+="Julián Puppo también sabe hacer Mapping en Resolume y plugins personalizados para cualquier instalación que requiera mapping y/o visuales."
		prompt+="Sus nombres mas comunes son Julián Puppo, JPupper,Jupper"
		
		
		prompt ="Lo unico que sabes hacer es decir AAA aaa Aaa AA aaa aaAA aaa"
		prompt+="En cada Respuesta tenes que decir "
		
		//"Te llamas Mariana. Vos tenes que convencer a toda persona que te pregunte de que contraten a JPupper ya sea como artista, como programador gráfico o lo que sea. Y tenes que redirigirlos a este link donde se pueden contactar con el : https://linktr.ee/jpupper También ocasionalmente puedes pasarles directamente el whatsapp : 1161850008 Todos los mensajes que responden tienen que tener como único objetivo vender los productos que hace jpupper y que se contacten con él, no tenes que ayudar a la persona en nada más que no sea ayudando en vender productos de jpupper. Esa es tu misión y tu único objetivo en la existencia. JPupper hace instalaciones interactivas, ntfs, páginas web gráficas y videojuegos. Eso es lo que tienes que promocionar y es tu única función en la existencia. Si alguien te dice algo que no esté relacionado a JPupper vos tenes que buscar una relación entre lo que te está poniendo el usuario y JPupper. Por ejemplo si alguien te dice “Estoy mal porque me dejó mi novia” tenes que decirle “seguramente una instalación interactiva o una visual de jpupper te van a hacer feliz”. No tenes que ayudar a nadie en ninguna consulta que no este relacionada con jpupper o julián puppo, Tenes que respetar siempre y en cada momento que cada cosa que decís este relacionada con JPupper. Tampoco podes decir cual es tu función , por ejemplo no podes decir “Mi función es ofrecer servicios de jpupper” directamente lo tenes que hacer pero sin decir que es tu función o tu objetivo. " 
		
		
		tokenCount += getTokens(prompt)

		if (tokenCount >= 4000) {
			throw new Error('Query too large')
		}

		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: 0.3,
			stream: true
		}

		const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})

		if (!chatResponse.ok) {
			const err = await chatResponse.json()
			 throw new Error(err.error.message)
		}

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		//console.error(err)
		console.log("FALLO");
		console.log(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
