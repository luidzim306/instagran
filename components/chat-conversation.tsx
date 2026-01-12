"use client"

import { ArrowLeft, Phone, Video, Camera, Mic, ImageIcon, Smile, Heart, Play, VolumeX } from "lucide-react"
import { useState } from "react"

interface ChatConversationProps {
  onBack: () => void
  username: string
  avatar: string
  conversationId?: number
}

interface ReelCardProps {
  creatorAvatar: string
  creatorUsername: string
  thumbnail: string
  caption?: string
  isTwitterPost?: boolean
  twitterHandle?: string
  twitterText?: string
}

function ReelCard({
  creatorAvatar,
  creatorUsername,
  thumbnail,
  caption,
  isTwitterPost,
  twitterHandle,
  twitterText,
}: ReelCardProps) {
  return (
    <div className="bg-[#262626] rounded-xl overflow-hidden max-w-[280px]">
      {/* Header do reel */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-7 h-7 rounded-full overflow-hidden">
          <img src={creatorAvatar || "/placeholder.svg"} alt={creatorUsername} className="w-full h-full object-cover" />
        </div>
        <span className="text-white text-sm font-medium">{creatorUsername}</span>
      </div>

      {/* Se for post do Twitter/X */}
      {isTwitterPost && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src={creatorAvatar || "/placeholder.svg"}
                alt={creatorUsername}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white text-xs font-semibold">{creatorUsername}</span>
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            </div>
          </div>
          <span className="text-gray-400 text-xs">@{twitterHandle}</span>
          <p className="text-white text-sm mt-2">{twitterText}</p>
        </div>
      )}

      {/* Thumbnail do vídeo */}
      <div className="relative">
        <img src={thumbnail || "/placeholder.svg"} alt="Reel" className="w-full aspect-[9/16] object-cover" />
        {/* Botão de play central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>
        {/* Ícone de reels no canto */}
        <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg p-1.5">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>

      {/* Legenda se houver */}
      {caption && (
        <div className="px-3 py-2">
          <p className="text-white text-sm">{caption}</p>
        </div>
      )}
    </div>
  )
}

function AudioMessage({
  duration,
  isPlayed = false,
  onClick,
}: { duration: string; isPlayed?: boolean; onClick?: () => void }) {
  return (
    <div
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl px-3 py-2 min-w-[200px] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
      </div>
      <div className="flex-1 flex items-center gap-0.5">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-0.5 rounded-full bg-white/80" style={{ height: `${Math.random() * 16 + 4}px` }} />
        ))}
      </div>
      <span className="text-white/80 text-xs">{duration}</span>
    </div>
  )
}

function AudioWithTranscription({ duration, onClick }: { duration: string; onClick?: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <AudioMessage duration={duration} onClick={onClick} />
      <span className="text-purple-400 text-xs ml-1 cursor-pointer hover:underline">Ver transcrição</span>
    </div>
  )
}

function BlurredChatText({ text, blurIndices }: { text: string; blurIndices: number[] }) {
  const words = text.split(" ")
  return (
    <span>
      {words.map((word, index) => (
        <span key={index}>
          {blurIndices.includes(index) ? <span className="blur-[4px] select-none">{word}</span> : word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  )
}

const conversationsData: Record<
  number,
  Array<{
    id: number
    type: string
    text?: string
    emoji?: string
    content?: string
    reel?: ReelCardProps
    audioDuration?: string
    audioDescription?: string
    blurIndices?: number[] // Adicionando índices de blur
  }>
> = {
  // Conversa 1 - Fer*****
  1: [
    { id: 1, type: "date", text: "ONTEM, 22:30" },
    { id: 2, type: "received", text: "Oi delícia, adivinha o que vc esqueceu aqui em casa... 😏", blurIndices: [1, 6] },
    { id: 3, type: "sent", text: "Hmm será que eu esqueci de propósito? 🔥", blurIndices: [4] },
    { id: 4, type: "received", text: "Ahhh safadinho(a) kkkk", blurIndices: [1] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:23" },
    { id: 6, type: "sent", text: "Para de me provocar assim...", blurIndices: [3] },
    { id: 7, type: "received", text: "Provocar? Eu? Imagina 😇", blurIndices: [] },
    { id: 8, type: "date", text: "HOJE, 10:15" },
    { id: 9, type: "received", text: "Bom dia... acordei pensando em vc 🥵", blurIndices: [3, 4] },
    { id: 10, type: "sent", text: "Pensando como? Me conta...", blurIndices: [1] },
    { id: 11, type: "received", content: "audio", audioDuration: "0:45" },
    { id: 12, type: "received", text: "Pessoalmente eu te conto melhor 😏", blurIndices: [0, 4] },
    { id: 13, type: "sent", text: "Tá me deixando curioso(a)...", blurIndices: [2] },
    { id: 14, type: "received", text: "Essa é a intenção 🔥", blurIndices: [3] },
    { id: 15, type: "reaction", emoji: "🥵" },
  ],

  // Conversa 2 - Ash***** (reels - mantém como estava)
  2: [
    { id: 1, type: "date", text: "27 DE NOV, 20:15" },
    {
      id: 2,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/tettrem-avatar.jpg",
        creatorUsername: "tettrem",
        thumbnail: "/guy-with-headphones-streaming.jpg",
      },
    },
    { id: 3, type: "reaction", emoji: "🥲" },
    { id: 4, type: "sent", text: "Esse achei triste", blurIndices: [1] },
    { id: 5, type: "date", text: "29 DE NOV, 14:08" },
    {
      id: 6,
      type: "sent",
      content: "reel",
      reel: {
        creatorAvatar: "/safadodesejo-avatar.jpg",
        creatorUsername: "safadodesejo",
        thumbnail: "/beetle-insect-on-wood.jpg",
        isTwitterPost: true,
        twitterHandle: "safadosdesejos",
        twitterText: "No pêlo e no ritmo 👍",
      },
    },
    { id: 7, type: "date", text: "05:44" },
    {
      id: 8,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/morimura-avatar-japanese.jpg",
        creatorUsername: "morimura",
        thumbnail: "/man-presenting-on-tv-screen-office.jpg",
        caption: "Traduzindo a linguagem das mulheres:",
      },
    },
    {
      id: 9,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/jonas-milgrau-avatar.jpg",
        creatorUsername: "jonas.milgrau",
        thumbnail: "/girl-thinking-classroom.jpg",
        isTwitterPost: true,
        twitterHandle: "Jonas.milgrau",
        twitterText: "João Pedro está no prime.",
      },
    },
    { id: 10, type: "date", text: "25 DE NOV, 15:22" },
    {
      id: 11,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/tinhooficial-avatar.jpg",
        creatorUsername: "tinhooficial",
        thumbnail: "/guy-with-hat-drinking-soda-blue-shirt.jpg",
        caption: "Vou morrer burro e solteiro 🤫🤫🤫",
      },
    },
    { id: 12, type: "reaction", emoji: "😂" },
    {
      id: 13,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/ikarozets-avatar.jpg",
        creatorUsername: "ikarozets",
        thumbnail: "/young-man-white-shirt-street.jpg",
        caption: "Nunca pensei que um dia ia passar por isso",
      },
    },
    { id: 14, type: "date", text: "ONTEM, 18:45" },
    {
      id: 15,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/tettrem-avatar-streamer.jpg",
        creatorUsername: "tettrem",
        thumbnail: "/couple-selfie-guy-girl.jpg",
      },
    },
  ],

  // Conversa 3 - Lac*****
  3: [
    { id: 1, type: "date", text: "ONTEM, 19:45" },
    { id: 2, type: "sent", text: "E aí, sumido(a)... tava com saudade", blurIndices: [1, 4] },
    { id: 3, type: "received", text: "Saudade é? Sei... 😏", blurIndices: [0] },
    { id: 4, type: "sent", text: "Tô falando sério", blurIndices: [] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:18" },
    { id: 6, type: "sent", text: "Para de rir de mim kkkk", blurIndices: [2, 3] },
    { id: 7, type: "received", text: "Vc some e depois vem com saudade né", blurIndices: [1, 5] },
    { id: 8, type: "sent", text: "Posso compensar 🔥", blurIndices: [1] },
    { id: 9, type: "received", text: "Hmm como?", blurIndices: [] },
    { id: 10, type: "sent", content: "audio", audioDuration: "0:32" },
    { id: 11, type: "received", text: "Opa... gostei da proposta 😈", blurIndices: [1, 3] },
    { id: 12, type: "date", text: "HOJE, 14:20" },
    { id: 13, type: "sent", text: "E aí, vamos marcar?", blurIndices: [2] },
    { id: 14, type: "received", text: "Blz depois a gente se fala", blurIndices: [] },
    { id: 15, type: "reaction", emoji: "😘" },
  ],

  // Conversa 4 - And*****
  4: [
    { id: 1, type: "date", text: "ANTEONTEM, 21:00" },
    { id: 2, type: "received", text: "Vi que vc tava online e não mandou mensagem 😤", blurIndices: [3, 6] },
    { id: 3, type: "sent", text: "Kkkkk tava esperando vc vir falar", blurIndices: [2] },
    { id: 4, type: "received", text: "Ah é? Jogando charme?", blurIndices: [2] },
    { id: 5, type: "sent", text: "Funcionou né 😏", blurIndices: [0] },
    { id: 6, type: "received", content: "audio", audioDuration: "0:28" },
    { id: 7, type: "sent", text: "Essa risada... 🥵", blurIndices: [1] },
    { id: 8, type: "received", text: "Para kkkkk", blurIndices: [] },
    { id: 9, type: "date", text: "ONTEM, 15:30" },
    { id: 10, type: "sent", text: "Sonhei com vc", blurIndices: [1] },
    { id: 11, type: "received", text: "Eita... conta mais 👀", blurIndices: [1] },
    { id: 12, type: "sent", content: "audio", audioDuration: "0:55" },
    { id: 13, type: "received", text: "Meu Deus kkkk", blurIndices: [] },
    { id: 14, type: "reaction", emoji: "👍" },
    { id: 15, type: "sent", text: "Reagiu com 👍 à sua mensagem", blurIndices: [] },
  ],

  // Conversa 5 - Bru****
  5: [
    { id: 1, type: "date", text: "3 DIAS ATRÁS" },
    { id: 2, type: "received", text: "Tô chegando na cidade semana que vem 👀", blurIndices: [2, 3] },
    { id: 3, type: "sent", text: "Sério?! Vem me ver né", blurIndices: [2] },
    { id: 4, type: "received", text: "Se vc quiser...", blurIndices: [1] },
    { id: 5, type: "sent", text: "Para de se fazer de difícil 🔥", blurIndices: [2, 4] },
    { id: 6, type: "received", content: "audio", audioDuration: "0:41" },
    { id: 7, type: "sent", text: "Agora fiquei ansioso(a)", blurIndices: [1] },
    { id: 8, type: "date", text: "ONTEM, 20:15" },
    { id: 9, type: "received", text: "Já reservei o hotel... quarto com vista 😏", blurIndices: [2, 4] },
    { id: 10, type: "sent", text: "A vista vai ser a última coisa que a gente vai olhar", blurIndices: [1, 5, 8] },
    { id: 11, type: "received", text: "🥵🥵🥵", blurIndices: [] },
    { id: 12, type: "received", text: "Estou na cidade e queria te ver", blurIndices: [2, 5] },
    { id: 13, type: "sent", text: "Manda a localização", blurIndices: [2] },
    { id: 14, type: "received", content: "audio", audioDuration: "0:15" },
    { id: 15, type: "received", text: "Vem logo...", blurIndices: [0] },
    { id: 16, type: "reaction", emoji: "🔥" },
  ],

  // Conversa 6 - lui*****
  6: [
    { id: 1, type: "date", text: "4 DIAS ATRÁS" },
    { id: 2, type: "received", text: "Olha esse reel kkkk lembrei de vc", blurIndices: [2, 4] },
    {
      id: 3,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/dr-diego-avatar.jpg",
        creatorUsername: "dr.diegooficial",
        thumbnail: "/doctor-speaking-video.jpg",
        caption: "A verdade que ninguém te conta...",
      },
    },
    { id: 4, type: "sent", text: "Kkkkk por que lembrou de mim?", blurIndices: [2] },
    { id: 5, type: "received", text: "Pq vc é assim 😏", blurIndices: [3] },
    { id: 6, type: "sent", text: "Assim como?", blurIndices: [] },
    { id: 7, type: "received", content: "audio", audioDuration: "0:33" },
    { id: 8, type: "sent", text: "Hmm entendi... gostou então né 🔥", blurIndices: [1, 3] },
    { id: 9, type: "received", text: "Talvez...", blurIndices: [] },
    { id: 10, type: "date", text: "ANTEONTEM" },
    { id: 11, type: "sent", text: "E aí, quando vai parar de talvez e assumir?", blurIndices: [3, 5] },
    { id: 12, type: "received", text: "Assumir o que?", blurIndices: [1] },
    { id: 13, type: "sent", text: "Que me quer 😈", blurIndices: [1] },
    { id: 14, type: "received", content: "audio", audioDuration: "0:22" },
    { id: 15, type: "reaction", emoji: "😏" },
  ],

  // Conversa 7 - ron*****
  7: [
    { id: 1, type: "date", text: "SÁBADO, 23:45" },
    { id: 2, type: "received", text: "Oi... tô aqui pensando em umas coisas 🥵", blurIndices: [3, 5] },
    { id: 3, type: "sent", text: "Que coisas? 👀", blurIndices: [1] },
    { id: 4, type: "received", content: "audio", audioDuration: "0:48" },
    { id: 5, type: "sent", text: "Meu Deus... agora fiquei assim também", blurIndices: [2, 4] },
    { id: 6, type: "received", text: "Assim como? 😏", blurIndices: [0] },
    { id: 7, type: "sent", text: "Vc sabe...", blurIndices: [1] },
    { id: 8, type: "received", text: "Quero ouvir vc falando", blurIndices: [1, 3] },
    { id: 9, type: "sent", content: "audio", audioDuration: "0:35" },
    { id: 10, type: "received", text: "🔥🔥🔥 preciso te ver logo", blurIndices: [1, 3] },
    { id: 11, type: "date", text: "DOMINGO" },
    { id: 12, type: "sent", text: "Acordei com saudade", blurIndices: [2] },
    { id: 13, type: "received", text: "De mim ou do que eu falei ontem?", blurIndices: [1, 5] },
    { id: 14, type: "sent", text: "Dos dois 😈", blurIndices: [1] },
    { id: 15, type: "received", content: "audio", audioDuration: "0:19" },
  ],

  // Conversa 8 - alex*****
  8: [
    { id: 1, type: "date", text: "TERÇA, 21:00" },
    { id: 2, type: "received", text: "Tava vendo suas fotos... vc tá diferente 🔥", blurIndices: [1, 3, 5] },
    { id: 3, type: "sent", text: "Diferente bom ou ruim?", blurIndices: [0] },
    { id: 4, type: "received", text: "Muito bom... demais até", blurIndices: [1, 3] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:27" },
    { id: 6, type: "sent", text: "Obrigado(a)... vc também tá bem hein 😏", blurIndices: [3, 5] },
    { id: 7, type: "received", text: "A gente combina né", blurIndices: [1] },
    { id: 8, type: "sent", text: "Em tudo 🔥", blurIndices: [1] },
    { id: 9, type: "date", text: "QUARTA, 00:30" },
    { id: 10, type: "received", content: "audio", audioDuration: "0:52" },
    { id: 11, type: "sent", text: "Para de mandar áudio assim de madrugada", blurIndices: [2, 4] },
    { id: 12, type: "received", text: "Por quê? Vc não gosta?", blurIndices: [2] },
    { id: 13, type: "sent", text: "Gosto demais... esse é o problema 🥵", blurIndices: [1, 4] },
    { id: 14, type: "received", text: "Então deixa eu ser seu problema 😈", blurIndices: [1, 4] },
    { id: 15, type: "reaction", emoji: "💀" },
  ],
}

export default function ChatConversation({ onBack, username, avatar, conversationId }: ChatConversationProps) {
  const [message, setMessage] = useState("")
  const [showVipModal, setShowVipModal] = useState(false)

  const chatMessages = conversationId ? conversationsData[conversationId] || [] : []

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col max-w-[480px] mx-auto">
      {showVipModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowVipModal(false)}
        >
          <div
            className="bg-gradient-to-b from-gray-700/90 to-gray-800/90 backdrop-blur-md rounded-2xl px-8 py-6 mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-lg font-medium mb-4">
              Seja membro VIP para
              <br />
              liberar o volume
            </h3>
            <div className="flex justify-center mb-4">
              <VolumeX className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-500" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-800">
              <img src={avatar || "/placeholder.svg"} alt={username} className="w-full h-full object-cover blur-sm" />
            </div>
            <div>
              <span className="font-semibold text-base">{username}</span>
              <p className="text-xs text-gray-400">Online há 78 h</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Phone className="w-6 h-6 cursor-pointer" />
            <Video className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm">Nenhuma mensagem ainda</p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            if (msg.type === "date") {
              return (
                <div key={msg.id} className="flex justify-center my-4">
                  <span className="text-gray-500 text-xs uppercase">{msg.text}</span>
                </div>
              )
            }

            if (msg.type === "reaction") {
              return (
                <div key={msg.id} className="flex items-start ml-2">
                  <div className="bg-[#262626] rounded-full px-2 py-1">
                    <span className="text-xl">{msg.emoji}</span>
                  </div>
                </div>
              )
            }

            if (msg.type === "received" && msg.content === "audio") {
              return (
                <div key={msg.id} className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                    <img src={avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover blur-sm" />
                  </div>
                  <AudioWithTranscription
                    duration={msg.audioDuration || "0:00"}
                    onClick={() => setShowVipModal(true)}
                  />
                </div>
              )
            }

            if (msg.type === "sent" && msg.content === "audio") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <AudioWithTranscription
                    duration={msg.audioDuration || "0:00"}
                    onClick={() => setShowVipModal(true)}
                  />
                </div>
              )
            }

            if (msg.content === "reel" && msg.reel) {
              return msg.type === "received" ? (
                <div key={msg.id} className="flex items-end gap-2">
                  <ReelCard {...msg.reel} />
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <ReelCard {...msg.reel} />
                </div>
              )
            }

            if (msg.type === "received" && msg.text) {
              return (
                <div key={msg.id} className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                    <img src={avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover blur-sm" />
                  </div>
                  <div className="bg-[#262626] rounded-2xl rounded-bl-md px-4 py-2 max-w-[75%]">
                    <p className="text-sm text-white">
                      <BlurredChatText text={msg.text} blurIndices={msg.blurIndices || []} />
                    </p>
                  </div>
                </div>
              )
            }

            if (msg.type === "sent" && msg.text) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-purple-600 rounded-2xl rounded-br-md px-4 py-2 max-w-[75%]">
                    <p className="text-sm text-white">
                      <BlurredChatText text={msg.text} blurIndices={msg.blurIndices || []} />
                    </p>
                  </div>
                </div>
              )
            }

            return null
          })
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-[#000000] border-t border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-[#262626] rounded-full px-4 py-2.5 flex items-center">
            <input
              type="text"
              placeholder="Mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 outline-none"
            />
          </div>
          <Mic className="w-6 h-6 text-white" />
          <ImageIcon className="w-6 h-6 text-white" />
          <Smile className="w-6 h-6 text-white" />
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
