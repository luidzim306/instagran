"use client"

import { ArrowLeft, MapPin, Eye, MessageCircle, Shield, CheckCircle, ChevronDown, Lock } from "lucide-react"
import { useState, useEffect } from "react"

interface ProfileData {
  username: string
  fullName: string
  profilePicUrl: string
  biography: string
  postsCount: number
  followersCount: number
  followingCount: number
}

interface StalkeaLandingProps {
  onBack: () => void
  username: string
  profileImage?: string
  profileData?: ProfileData
}

export default function StalkeaLanding({ onBack, username, profileImage, profileData }: StalkeaLandingProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      username: "o__prozind34",
      image: "/images/testimonial-1.jpeg",
      time: "1d",
      text: "Na versão completa testei com @ do boy e vi um monte de coisa. Localização, fotos escondidas, até conversas apagadas. Foi exatamente como mostrou.",
    },
    {
      username: "maria_silva22",
      image: "/images/testimonial-2.jpeg",
      time: "2d",
      text: "Gente, eu não acreditava que funcionava até testar. Descobri onde meu ex tava indo todo dia e com quem ele tava conversando. Valeu cada centavo!",
    },
    {
      username: "carlos_mendes",
      image: "/images/testimonial-3.jpeg",
      time: "3h",
      text: "Achei que era golpe mas resolvi arriscar. Consegui ver até os stories de melhores amigos de uma pessoa. A ferramenta é real e funciona muito bem.",
    },
    {
      username: "ana_beatriz_",
      image: "/images/testimonial-4.jpeg",
      time: "5h",
      text: "Usei pra descobrir se meu namorado tava sendo honesto comigo. Vi todas as conversas do direct dele. Recomendo demais pra quem tem desconfiança.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(testimonialTimer)
  }, [testimonials.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const actualProfilePic =
    profileImage && profileImage !== "/placeholder.svg"
      ? profileImage
      : profileData?.profilePicUrl && profileData.profilePicUrl !== "/placeholder.svg"
        ? profileData.profilePicUrl
        : "/placeholder.svg"

  const displayName = profileData?.fullName || username
  const displayUsername = profileData?.username || username
  const displayBio = profileData?.biography || ""
  const displayPosts = profileData?.postsCount || 0
  const displayFollowers = profileData?.followersCount || 0
  const displayFollowing = profileData?.followingCount || 0

  const formatNumber = (num: number) => {
    return num.toLocaleString("pt-BR")
  }

  const bioLines = displayBio.split("\n").filter((line) => line.trim())

  const lockedImages = [
    "/images/francielle-fitness-post.jpg",
    "/images/lessacoelhinha-post.jpg",
    "/images/francielle-gym-pink.png",
    "/images/maldives-couple.png",
    "/images/man-mountain-profile.jpg",
    "/images/copacabana-fireworks.avif",
  ]

  const features = [
    `Todas as mensagens do direct de ${displayName.split(" ")[0]}`,
    "Todas as fotos sem censura (incluindo apagadas)",
    "Localização em tempo real e locais que esteve",
    `Alerta sempre que ${displayName.split(" ")[0]} interagir com alguém`,
    "2 bônus surpresa avaliados em $120.00",
  ]

  return (
    <div className="bg-black text-white min-h-screen pb-24 max-w-[480px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm px-4 py-3 border-b border-gray-800">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
      </div>

      {/* Hero Section */}
      <div className="px-4 pt-6 pb-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          STALKEA<span className="text-purple-500">.AI</span>
        </h1>
        <p className="text-xl font-bold mb-1">
          A maior ferramenta de <span className="text-purple-500">Stalker</span> de 2026
        </p>
      </div>

      {/* Profile Card - Usando actualProfilePic e proxy de imagem */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src={
                actualProfilePic.startsWith("http")
                  ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=150&h=150`
                  : actualProfilePic
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=150&width=150"
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{displayName}</h3>
            <p className="text-gray-400 text-sm">@{displayUsername}</p>
          </div>
        </div>

        <div className="flex justify-around mb-4 py-4 border-y border-gray-700">
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayPosts)}</p>
            <p className="text-gray-400 text-xs">posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayFollowers)}</p>
            <p className="text-gray-400 text-xs">seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayFollowing)}</p>
            <p className="text-gray-400 text-xs">seguindo</p>
          </div>
        </div>

        <div className="text-sm text-gray-300 space-y-1">
          {bioLines.length > 0 ? (
            bioLines.map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <p className="text-gray-500 italic">Sem biografia</p>
          )}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-center">
          <p className="font-bold text-base mb-1">Espionagem 100% finalizada!</p>
          <p className="text-sm text-purple-100">Adquira seu acesso VIP e tenha acesso imediatamente a:</p>
        </div>
      </div>

      {/* Location Section - Usando actualProfilePic */}
      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Localização em tempo real</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Veja onde {displayName.split(" ")[0]} está agora, e os últimos locais por onde passou.
        </p>
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="h-48 bg-gray-800 relative">
            <img src="/images/unnamed.png" alt="Mapa" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 overflow-hidden">
                <img
                  src={
                    actualProfilePic.startsWith("http")
                      ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=150&h=150`
                      : actualProfilePic
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="font-semibold mb-1">Localização Atual</p>
            <p className="text-gray-400 text-sm">@{displayUsername}</p>
            <button className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm transition-colors">
              Ver
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Stories/Posts Section */}
      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Eye className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Stories e posts ocultos</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Veja stories de "Melhores Amigos" e posts que {displayName.split(" ")[0]} ocultou de você.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {lockedImages.map((image, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative border border-gray-800"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Post ${i + 1}`}
                className="w-full h-full object-cover blur-md brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white font-semibold">Conteúdo restrito</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Messages Section - Usando actualProfilePic */}
      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Mensagens do Direct</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Veja literalmente todas as mensagens de {displayName.split(" ")[0]}, incluindo mensagens temporárias
        </p>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={
                  actualProfilePic.startsWith("http")
                    ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=100&h=100`
                    : actualProfilePic
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{displayName.split(" ")[0]}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-green-500 text-xs">online</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 mb-3">
            <p className="text-sm">E aí, bora ver tudo do instagram de {displayName.split(" ")[0]}?</p>
          </div>
          <div className="bg-purple-600/20 rounded-xl p-3 border border-purple-600/50">
            <p className="text-xs text-purple-300">🔒 Mais 147 mensagens bloqueadas</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Veja o que falam as pessoas que usam o Stalkea.ai</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                alt={testimonials[currentTestimonial].username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{testimonials[currentTestimonial].username}</p>
              <p className="text-gray-400 text-xs">{testimonials[currentTestimonial].time}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">{testimonials[currentTestimonial].text}</p>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-500 w-4" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-purple-600">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            Com o <span className="text-purple-500">Stalkea.ai</span> você vai ter
          </h3>
          <p className="text-base mb-1">acesso completo ao instagram de {displayName.split(" ")[0]} por apenas:</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 line-through text-sm">De: $279.90</p>
          <p className="text-5xl font-bold text-purple-500 mb-2">
            $37<span className="text-2xl">.00</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>30 dias de garantia</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">{feature}</p>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-lg">
          Adquirir Acesso VIP Agora
        </button>
      </div>

      {/* FAQ Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {[
            {
              question: "A ferramenta realmente funciona?",
              answer: "Sim! Nossa ferramenta utiliza tecnologia avançada para fornecer informações em tempo real.",
            },
            {
              question: "A pessoa vai saber que eu stalkeei o perfil dela?",
              answer: "Não! Todo o processo é 100% anônimo e discreto.",
            },
            {
              question: "Funciona em perfis privados?",
              answer: "Sim, funciona tanto em perfis públicos quanto privados.",
            },
            {
              question: "Preciso instalar alguma coisa?",
              answer: "Não! Tudo funciona online, direto do seu navegador.",
            },
            {
              question: "Como funciona a garantia?",
              answer: "Oferecemos 30 dias de garantia total. Se não gostar, devolvemos 100% do seu dinheiro.",
            },
            {
              question: "Quanto tempo tenho acesso?",
              answer: "O acesso VIP é vitalício! Pague uma vez e use para sempre.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-500 transition-transform ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-5 border border-green-600">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 text-green-500" />
          <h3 className="text-lg font-bold text-green-500">Garantia de 30 Dias</h3>
        </div>
        <p className="text-sm text-gray-300">
          Teste sem risco! Se não gostar ou por algum motivo não se adaptar, devolvemos 100% do seu dinheiro.
        </p>
      </div>

      {/* Warning Section */}
      <div className="mx-4 mb-6 bg-red-900/20 rounded-xl p-4 border border-red-600">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">!</span>
          </div>
          <p className="text-sm text-gray-300">
            As informações acessadas são <span className="font-bold text-white">extremamente sensíveis</span>. Use com
            responsabilidade.
          </p>
        </div>
      </div>

      {/* Bottom Warning */}
      <div className="bg-gray-900 p-4 text-center border-t border-gray-800">
        <p className="text-sm font-bold mb-1">Finalize sua compra agora!</p>
        <p className="text-xs text-gray-400">
          Não saia ou recarregue essa página, a espionagem não pode ser realizada novamente.
        </p>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm">Acesso VIP por apenas $37.00</p>
            <p className="text-purple-200 text-xs">Liberado em até {formatTime(timeRemaining)}</p>
          </div>
          <button className="bg-white text-purple-700 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-purple-50 transition-colors shadow-lg">
            Adquirir
          </button>
        </div>
      </div>
    </div>
  )
}
