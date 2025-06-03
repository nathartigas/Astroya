"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  links: { href: string; label: string; id: string }[]
  activeSection: string
  onClose: () => void
}

export function MobileMenu({ links, activeSection, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-end p-6">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="h-5 w-5 text-zinc-400" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center space-y-8 p-8">
        {links.map((link, index) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={link.href}
              className={cn(
                "text-2xl font-bold transition-colors",
                activeSection === link.id ? "text-[#FF5500]" : "text-zinc-400",
              )}
              onClick={onClose}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: links.length * 0.05 }}
          className="mt-8 pt-8 border-t border-zinc-800 w-32 flex justify-center"
        >
          <Link
            href="#contact"
            onClick={onClose}
            className="relative rounded-full px-6 py-3 text-white overflow-hidden group bg-gradient-to-br from-[#FF5500]/80 to-[#9200BE]"
          >
            <span className="relative z-10">Contato</span>
            <span className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF5500]/50 to-[#9200BE] opacity-0 blur transition-all duration-500 group-hover:opacity-100"></span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
