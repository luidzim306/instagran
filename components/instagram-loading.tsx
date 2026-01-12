"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MatrixBackground } from "@/components/matrix-background"

interface InstagramLoadingProps {
  username: string
  onConfirm: () => void
}

const generateRandomPassword = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export function InstagramLoading({ username, onConfirm }: InstagramLoadingProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [displayPassword, setDisplayPassword] = useState("**************")

  useEffect(() => {
    const passwordInterval = setInterval(() => {
      setDisplayPassword(generateRandomPassword(14))
    }, 100)

    const timer = setTimeout(() => {
      clearInterval(passwordInterval)
      setDisplayPassword("**************")
      setShowSuccess(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(passwordInterval)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <MatrixBackground />
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          {/* Logo Instagram */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-script text-white mb-8" style={{ fontFamily: "cursive" }}>
              Instagram
            </h1>
          </div>

          {/* Campos de Login */}
          <div className="space-y-3 mb-4">
            <Input
              type="text"
              value={username}
              readOnly
              className="bg-[#121212] border-gray-800 text-white h-11 text-sm"
            />
            <Input
              type="text"
              value={displayPassword}
              readOnly
              className="bg-[#121212] border-gray-800 text-white h-11 text-sm font-mono"
            />
          </div>

          <div
            className={`${showSuccess ? "bg-green-600/20 border-green-500/30" : "bg-purple-600/20 border-purple-500/30"} border rounded-lg p-4 mb-4 flex items-center gap-3 transition-colors duration-500`}
          >
            <div
              className={`w-10 h-10 rounded-full ${showSuccess ? "bg-green-600" : "bg-purple-600"} flex items-center justify-center flex-shrink-0 transition-colors duration-500`}
            >
              {showSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              )}
            </div>
            <div>
              <p className="text-white font-medium text-sm mb-1">
                {showSuccess ? "Criptografia quebrada com sucesso" : "Quebrando criptografia da conta"}
              </p>
              {!showSuccess && <p className="text-gray-400 text-xs">Testando combinações de senha...</p>}
            </div>
          </div>

          {/* Botão Entrar */}
          <Button
            onClick={onConfirm}
            className="w-full h-11 bg-[#0095f6] hover:bg-[#0095f6]/90 text-white text-sm font-semibold rounded-lg mb-4"
          >
            Entrar
          </Button>

          {/* Esqueceu a senha */}
          <div className="text-center mb-4">
            <a href="#" className="text-[#00a8ff] text-sm">
              Esqueceu a senha?
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
