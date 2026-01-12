"use client"

import { ArrowLeft, Plus, Edit3, Lock, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import StalkeaLanding from "./stalkea-landing"
import ChatConversation from "./chat-conversation"

interface ProfileData {
  username: string
  fullName: string
  profilePicUrl: string
  biography: string
  postsCount: number
  followersCount: number
  followingCount: number
}

interface InstagramMessagesProps {
  onBack: () => void
  username: string
  profilePicUrl?: string
  profileData?: ProfileData
}

export default function InstagramMessages({ onBack, username, profilePicUrl, profileData }: InstagramMessagesProps) {
  const [timeRemaining, setTimeRemaining] = useState(586)
  const [showVipPage, setShowVipPage] = useState(false)
  const [showChat, setShowChat] = useState<{ id: number; username: string; avatar: string } | null>(null)
  const [showLockedModal, setShowLockedModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const rawUserImage = profileData?.profilePicUrl || profilePicUrl || ""
  const hasValidImage = rawUserImage && rawUserImage !== "/placeholder.svg" && rawUserImage.length > 0
  const userImage = hasValidImage ? rawUserImage : "/generic-social-media-profile.png"

  const proxyUserImage = userImage.startsWith("http")
    ? `https://wsrv.nl/?url=${encodeURIComponent(userImage)}&w=150&h=150&fit=cover`
    : userImage

  const stories = [
    { id: 1, username: "Sua nota", image: proxyUserImage, isOwn: true },
    { id: 2, username: "Geo*****", image: "/young-woman-selfie.jpg" },
    { id: 3, username: "Sad*****", image: "/images/1.jpeg" },
    { id: 4, username: "Syl*****", image: "/woman-smiling-photo.jpg" },
  ]

  const messages = [
    {
      id: 1,
      username: "Fer*****",
      message: "Oi delícia, adivinha o que vc esquec...",
      time: "Agora",
      unread: true,
      locked: false,
      avatar: "/images/2.jpeg",
    },
    {
      id: 2,
      username: "Ash*****",
      message: "Encaminhou um reel de jor...",
      time: "33 min",
      unread: true,
      locked: false,
      avatar: "/blonde-woman-instagram.jpg",
    },
    {
      id: 3,
      username: "Lac*****",
      message: "Blz depois a gente se fala",
      time: "2 h",
      unread: false,
      locked: false,
      avatar: "/brunette-woman-profile.jpg",
    },
    {
      id: 4,
      username: "And*****",
      message: "Reagiu com 👍 à sua mensagem",
      time: "6 h",
      unread: false,
      locked: false,
      avatar: "/images/man-gray-shirt.jpeg",
    },
    {
      id: 5,
      username: "Bru****",
      message: "4 novas mensagens",
      time: "22 h",
      unread: true,
      locked: false,
      avatar: "/young-woman-selfie.jpg",
    },
    {
      id: 6,
      username: "lui*****",
      message: "Enviou um reel de dr.diegooficial",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/images/man-tattoo-chest.jpeg",
    },
    {
      id: 7,
      username: "ron*****",
      message: "Enviado sábado",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/images/man-mirror-selfie.jpeg",
    },
    {
      id: 8,
      username: "alex*****",
      message: "Enviou uma mensagem de voz",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      username: "abb*****",
      message: "Enviou uma mensagem de voz",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      username: "ale*****",
      message: "kkkkkkkkk",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 11,
      username: "ana*****",
      message: "Curtiu sua mensagem",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleOpenChat = (msg: { id: number; username: string; avatar: string; locked: boolean }) => {
    if (msg.locked) {
      setShowLockedModal(true)
    } else {
      setShowChat({ id: msg.id, username: msg.username, avatar: msg.avatar })
    }
  }

  const handleOpenVipPage = () => {
    setShowVipPage(true)
  }

  if (showChat) {
    return (
      <ChatConversation
        onBack={() => setShowChat(null)}
        username={showChat.username}
        avatar={showChat.avatar}
        conversationId={showChat.id}
      />
    )
  }

  if (showVipPage) {
    return (
      <StalkeaLanding
        onBack={() => setShowVipPage(false)}
        username={username}
        profileImage={profilePicUrl}
        profileData={profileData}
      />
    )
  }

  if (showLockedModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLockedModal(false)} />
        <div className="relative z-10 mx-4 w-full max-w-sm">
          <div className="bg-gradient-to-b from-[#4a3028] to-[#3d2520] rounded-3xl p-6 shadow-2xl border border-[#5a4038]">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#d4a574]" />
              <h3 className="text-[#e8d5c4] font-semibold text-lg">Ação bloqueada</h3>
            </div>
            <p className="text-[#c4a88c] text-center text-sm mb-6">
              Seja um membro VIP do INSTACHECK.AI para desbloquear essa conversa
            </p>
            <button
              onClick={() => {
                setShowLockedModal(false)
                setShowVipPage(true)
              }}
              className="w-full bg-[#6b4a3a] hover:bg-[#7d5a48] text-[#e8d5c4] font-semibold py-3.5 rounded-xl transition-colors"
            >
              Adquirir Acesso VIP
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen pb-24 max-w-[480px] mx-auto">
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
            <span className="font-semibold text-base">{username}</span>
          </div>
          <div className="flex items-center gap-4">
            <Plus className="w-6 h-6 cursor-pointer" />
            <Edit3 className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="bg-[#262626] rounded-full px-4 py-2.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-400 text-sm">Interaja com a Meta AI ou pesquise</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 relative">
                <img
                  src={story.image.startsWith("http") ? story.image : story.image}
                  alt={story.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                  }}
                />
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] mt-1.5 text-gray-300 truncate w-16 text-center">{story.username}</p>
            </div>
          ))}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#262626] flex items-center justify-center text-xs text-gray-400 text-center px-2 leading-tight border-2 border-gray-700">
              <span>O vontd tudo a 3</span>
            </div>
            <p className="text-[10px] mt-1.5 text-gray-300 truncate w-16 text-center">Grupo</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-base">Mensagens</h2>
        <span className="text-blue-500 text-sm font-semibold">Pedidos (4)</span>
      </div>

      <div className="divide-y divide-gray-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            onClick={() => handleOpenChat(msg)}
          >
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 ring-2 ring-transparent">
                <img
                  src={msg.avatar || "/placeholder.svg"}
                  alt={msg.username}
                  className="w-full h-full object-cover blur-[3px]"
                />
              </div>
              {msg.locked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm text-white">{msg.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${msg.unread ? "text-white font-medium" : "text-gray-400"}`}>
                  {msg.message}
                </p>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-gray-400 text-xs">• {msg.time}</span>
                  {!msg.locked && (
                    <svg
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs flex items-center gap-1.5">
                Prévia disponível por {formatTime(timeRemaining)}
                <span className="inline-block w-2 h-2 rounded-full bg-white/40 animate-pulse"></span>
              </p>
              <p className="text-purple-100 text-[10px] leading-tight mt-0.5">
                Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as
                funcionalidades e ter acesso permanente é necessário ser um membro VIP.
              </p>
            </div>
            <button
              onClick={handleOpenVipPage}
              className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full text-xs whitespace-nowrap hover:bg-purple-50 transition-colors flex-shrink-0 shadow-lg"
            >
              Tornar-se VIP
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border-t border-gray-800 px-4 py-2 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <span className="text-gray-300 font-semibold text-sm">instacheck.ai</span>
          </div>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
