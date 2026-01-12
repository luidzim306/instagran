"use client"

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreVertical,
  Home,
  Search,
  PlusSquare,
  Play,
  Lock,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"
import InstagramMessages from "./instagram-messages" // Importing the InstagramMessages component
import StalkeaLanding from "./stalkea-landing" // Adicionando import do StalkeaLanding

interface Post {
  id: string
  username: string
  userImage: string
  postImage: string
  likes: number
  comments: number
  caption: string
  date: string
}

interface InstagramFeedProps {
  profileData: any
  username: string
}

export function InstagramFeed({ profileData, username }: InstagramFeedProps) {
  const [timeRemaining, setTimeRemaining] = useState(590)
  const [showNotification, setShowNotification] = useState(false)
  const [showBlockedModal, setShowBlockedModal] = useState(false)
  const [showMessages, setShowMessages] = useState(false) // Adicionando estado para controlar exibição da tela de mensagens
  const [showVipPage, setShowVipPage] = useState(false) // Adicionando estado para controlar exibição da página VIP

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }, 3000)

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearTimeout(notificationTimer)
      clearInterval(timer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const apiPosts: Post[] =
    profileData?.result?.edges?.slice(0, 2).map((edge: any, index: number) => {
      const node = edge.node
      return {
        id: node.id || `post-${index}`,
        username: node.owner?.username || username,
        userImage: node.owner?.profile_pic_url || profileData?.profilePicUrl || "/placeholder.svg",
        postImage: node.display_url || node.thumbnail_src || "/placeholder.svg",
        likes: node.edge_liked_by?.count || Math.floor(Math.random() * 100) + 10,
        comments: node.edge_media_to_comment?.count || Math.floor(Math.random() * 20) + 1,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "✨",
        date: node.taken_at_timestamp
          ? new Date(node.taken_at_timestamp * 1000).toLocaleDateString("pt-BR")
          : "há 2 dias",
      }
    }) || []

  const fakePosts: Post[] = [
    {
      id: "fake-1",
      username: "jadepicon",
      userImage: "/images/whatsapp-20image-202026-01-08-20at-2018.jpeg",
      postImage: "/images/whatsapp-20image-202026-01-08-20at-2018.jpeg",
      likes: 28100,
      comments: 622,
      caption: "O rio de janeiro continua lindo ...",
      date: "há 3 horas",
    },
    {
      id: "fake-2",
      username: "francielle",
      userImage: "/young-woman-selfie.jpg",
      postImage: "/images/francielle-gym-pink.png",
      likes: 847,
      comments: 93,
      caption: "dia lindo ....",
      date: "há 5 horas",
    },
    {
      id: "fake-3",
      username: "laisa",
      userImage: "/beautiful-woman-portrait.png",
      postImage: "/eyelash-extensions-close-up.jpg",
      likes: 15,
      comments: 4,
      caption: "Ламинирование ресниц-идеальное решение для тех, кто любит натуральность🔥 на пер... mais",
      date: "17 de outubro de 2025",
    },
    {
      id: "fake-4",
      username: "cheila",
      userImage: "/attractive-woman-profile.png",
      postImage: "/beauty-training-certificates.jpg",
      likes: 17,
      comments: 3,
      caption: "👩‍🎓👩‍🎓👩‍🎓 НАБИРАЮ УЧЕНИКОВ НА ПОСЛЕДНЕЕ ОБУЧЕНИЕ ПО СТАРОЙ СТОИМОСТИ ❗ 💥... mais",
      date: "16 de outubro de 2025",
    },
    {
      id: "fake-5",
      username: "alice",
      userImage: "/blonde-woman-instagram.jpg",
      postImage: "/woman-winter-photo.jpg",
      likes: 23,
      comments: 4,
      caption: "well этот год я провела по большей части в зале,немного дома и 7 дней загородом... mais",
      date: "há 2 dias",
    },
    {
      id: "fake-6",
      username: "rodrigo",
      userImage: "/images/man-mountain-profile.jpg",
      postImage: "/images/copacabana-fireworks.avif",
      likes: 1243,
      comments: 87,
      caption: "amo minha familia ❤️🎆",
      date: "há 1 dia",
    },
    {
      id: "fake-7",
      username: "julia",
      userImage: "/woman-smiling-photo.jpg",
      postImage: "/images/maldives-couple.png",
      likes: 3542,
      comments: 234,
      caption: "maldivas com meu amor ....",
      date: "há 8 horas",
    },
    {
      id: "fake-8",
      username: "luiz",
      userImage: "/images/7b2d50653d-4e1f-468f-a7e2-12f9e2249195-7d.png",
      postImage: "/images/7baf4187f1-b552-4f74-80e0-6623ce4ddd0b-7d.png",
      likes: 892,
      comments: 45,
      caption: "praia sol e um dia perfeito",
      date: "há 2 horas",
    },
  ]

  const allPosts = [...fakePosts, ...apiPosts].slice(0, 8)

  const ownerData = profileData?.result?.edges?.[0]?.node?.owner

  const userProfilePic =
    profileData?.profilePicUrl && profileData.profilePicUrl !== "/placeholder.svg"
      ? profileData.profilePicUrl
      : ownerData?.profile_pic_url || ownerData?.profile_pic_url_hd || "/placeholder.svg"

  const fullProfileData = {
    username: profileData?.username || ownerData?.username || username,
    fullName: profileData?.fullName || ownerData?.full_name || username,
    profilePicUrl: userProfilePic,
    // Usar os dados que já vêm processados em profileData
    biography: profileData?.biography || ownerData?.biography || "",
    postsCount:
      profileData?.postsCount ??
      profileData?.result?.edges?.length ??
      ownerData?.edge_owner_to_timeline_media?.count ??
      0,
    followersCount: profileData?.followersCount ?? ownerData?.follower_count ?? ownerData?.edge_followed_by?.count ?? 0,
    followingCount: profileData?.followingCount ?? ownerData?.following_count ?? ownerData?.edge_follow?.count ?? 0,
  }

  console.log("[v0] profileData received:", JSON.stringify(profileData))
  console.log("[v0] fullProfileData being passed to VIP:", JSON.stringify(fullProfileData))

  const stories = [
    { id: 1, username: "Seu story", image: userProfilePic, isOwn: true, borderColor: "none" },
    {
      id: 2,
      username: "xxx*****",
      image: "/images/7b2d50653d-4e1f-468f-a7e2-12f9e2249195-7d.png",
      borderColor: "green",
    },
    { id: 3, username: "xxx*****", image: "/young-woman-selfie.jpg", borderColor: "green" },
    { id: 4, username: "JUL*****", image: "/beautiful-woman-portrait.png", borderColor: "red" },
    { id: 5, username: "mar*****", image: "/woman-smiling-photo.jpg", borderColor: "red" },
    { id: 6, username: "ana*****", image: "/brunette-woman-profile.jpg", borderColor: "red" },
    { id: 7, username: "bia*****", image: "/blonde-woman-instagram.jpg", borderColor: "red", locked: true },
    { id: 8, username: "car*****", image: "/redhead-woman-photo.jpg", borderColor: "red", locked: true },
    { id: 9, username: "fer*****", image: "/attractive-woman-profile.png", borderColor: "red", locked: true },
    { id: 10, username: "jul*****", image: "/young-woman-selfie.jpg", borderColor: "red", locked: true },
    { id: 11, username: "isa*****", image: "/blonde-woman-instagram.jpg", borderColor: "red", locked: true },
  ]

  const handleBlockedAction = () => {
    setShowBlockedModal(true)
  }

  const handleOpenMessages = () => {
    // Adicionando handler para abrir mensagens
    setShowMessages(true)
  }

  const handleOpenVipPage = () => {
    window.location.href = "https://pay.mycheckoutt.com/01997889-d90f-7176-b1ad-330b2aadd114?ref="
  }

  if (showMessages) {
    return (
      <InstagramMessages
        onBack={() => setShowMessages(false)}
        username={username}
        profilePicUrl={userProfilePic}
        profileData={fullProfileData}
      />
    )
  }

  if (showVipPage) {
    return (
      <StalkeaLanding
        onBack={() => setShowVipPage(false)}
        username={username}
        profileImage={userProfilePic}
        profileData={fullProfileData}
      />
    )
  }

  return (
    <div className="bg-black text-white min-h-screen pb-40 max-w-[480px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="font-['Billabong'] text-3xl">Instagram</div>
        <div className="flex items-center gap-5">
          <div className="relative cursor-pointer" onClick={handleBlockedAction}>
            <Heart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              3
            </span>
          </div>
          <div className="relative cursor-pointer" onClick={handleOpenMessages}>
            <Send className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Notificação de mensagem */}
      {showNotification && (
        <div className="fixed top-14 left-0 right-0 z-40 mx-3 animate-in slide-in-from-top duration-300">
          <div className="bg-[#262626] rounded-lg p-3 flex items-start gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Instagram</p>
              <p className="text-gray-300 text-xs leading-tight">
                Fer****** enviou uma mensagem: "Oi delícia, adivinha o que vc esqueceu aqui? kkkk"
              </p>
            </div>
            <p className="text-gray-400 text-xs flex-shrink-0">Agora</p>
          </div>
        </div>
      )}

      {/* Stories */}
      <div className="border-b border-gray-800 px-2 py-2.5">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
              onClick={handleBlockedAction}
            >
              <div className="relative">
                <div
                  className={`w-[70px] h-[70px] rounded-full ${
                    story.borderColor === "green"
                      ? "bg-gradient-to-br from-green-400 to-green-600"
                      : story.borderColor === "red"
                        ? "bg-gradient-to-br from-red-400 to-red-600"
                        : "bg-gray-800"
                  } p-[2.5px]`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-black relative">
                    <img
                      src={
                        story.image.startsWith("http")
                          ? `https://wsrv.nl/?url=${encodeURIComponent(story.image)}&w=150&h=150`
                          : story.image
                      }
                      alt={story.username}
                      className={`w-full h-full object-cover ${story.locked ? "blur-md brightness-50" : ""}`}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                      }}
                    />
                    {story.locked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] mt-1 text-gray-300 truncate w-[70px] text-center">{story.username}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-800">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <div key={post.id} className="pb-3">
              {/* Post Header */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-800">
                    <img
                      src={
                        post.userImage.startsWith("http")
                          ? `https://wsrv.nl/?url=${encodeURIComponent(post.userImage)}&w=100&h=100&fit=cover`
                          : post.userImage
                      }
                      alt={post.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm">{post.username}</span>
                </div>
                <MoreVertical className="w-5 h-5" />
              </div>

              {/* Post Image */}
              <div className="relative w-full aspect-[4/5] bg-gray-900 overflow-hidden">
                <img
                  src={
                    post.postImage.startsWith("http")
                      ? post.postImage.includes("wsrv.nl")
                        ? post.postImage
                        : `https://wsrv.nl/?url=${encodeURIComponent(post.postImage)}&w=800&h=1000&fit=cover`
                      : post.postImage
                  }
                  alt="Post"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=800&width=800"
                  }}
                />
              </div>

              {/* Post Actions */}
              <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Heart className="w-[26px] h-[26px]" onClick={handleBlockedAction} />
                    <MessageCircle className="w-[26px] h-[26px]" onClick={handleBlockedAction} />
                    <Send className="w-[26px] h-[26px] rotate-[25deg]" />
                  </div>
                  <Bookmark className="w-6 h-6" />
                </div>

                <p className="font-semibold text-sm mb-1">{post.likes} curtidas</p>

                <div className="text-sm leading-tight">
                  <span className="font-semibold mr-2">{post.username}</span>
                  <span className="text-gray-300">{post.caption}</span>
                </div>

                {post.comments > 0 && (
                  <p className="text-gray-500 text-sm mt-1">Ver todos os {post.comments} comentários</p>
                )}

                <p className="text-gray-500 text-[11px] mt-1 uppercase">{post.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">Carregando posts...</div>
        )}
      </div>

      {/* VIP Paywall - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto">
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <span className="text-base">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs flex items-center gap-1.5">
                Prévia disponível por {formatTime(timeRemaining)}
                <span className="inline-block w-2 h-2 rounded-full bg-white/30 animate-pulse"></span>
              </p>
              <p className="text-purple-100 text-[11px] leading-tight mt-0.5">
                Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as
                funcionalidades e ter acesso permanente é necessário ser um membro VIP.
              </p>
            </div>
            <button
              onClick={handleOpenVipPage}
              className="bg-white text-purple-700 font-bold px-4 py-2 rounded-full text-xs whitespace-nowrap hover:bg-purple-50 transition-colors flex-shrink-0"
            >
              Tornar-se VIP
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-black border-t border-gray-800 px-6 py-1.5 flex items-center justify-between">
          <Home className="w-[26px] h-[26px]" />
          <Search className="w-[26px] h-[26px]" />
          <PlusSquare className="w-[26px] h-[26px]" />
          <Play className="w-[26px] h-[26px]" />
          <div className="w-[26px] h-[26px] rounded-full overflow-hidden">
            <img
              src={
                userProfilePic.startsWith("http")
                  ? `https://wsrv.nl/?url=${encodeURIComponent(userProfilePic)}&w=50&h=50`
                  : userProfilePic
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=50&width=50"
              }}
            />
          </div>
        </div>
      </div>

      {showBlockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop com blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBlockedModal(false)} />

          {/* Modal */}
          <div className="relative bg-gradient-to-br from-amber-900/90 to-rose-900/90 rounded-2xl p-8 mx-4 max-w-sm w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white font-bold text-lg mb-3">⚠️ Ação bloqueada</h3>

              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Seja um membro VIP da Instacheck.ai para ter acesso às curtidas
              </p>

              <button
                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-colors backdrop-blur-sm border border-white/30"
                onClick={handleOpenVipPage}
              >
                Adquirir Acesso VIP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
