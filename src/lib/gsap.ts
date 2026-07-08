import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export { gsap, useGSAP }

/** Shared premium easing tokens for GSAP timelines. */
export const EASE = {
  liquid: 'power3.out',
  spring: 'back.out(1.6)',
  expo: 'expo.out',
} as const
