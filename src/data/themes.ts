import { TemplateTheme } from '../types/canvas';

export const themes: Record<string, TemplateTheme> = {
  // LAYOUT 1: CLASSIC BUSINESS CANVAS - 3 ATTRACTIVE THEMES


  classicGlassmorphism: {
    name: 'Glassmorphism',
    fonts: {
      title: 'font-bold',
      heading: 'font-semibold',
      body: 'font-normal'
    },
    colors: {
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      accent: 'text-indigo-600',
      background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      text: 'text-gray-700',
      titleText: 'text-gray-900',
      sectionTitle: 'text-gray-900',
      sectionText: 'text-gray-700'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border',
      borderStyle: 'border-blue-200/60',
      shadow: 'shadow-2xl shadow-blue-100/50'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border',
      borderStyle: 'border-white/30 backdrop-blur-sm',
      shadow: 'shadow-xl shadow-blue-200/50'
    },
    sectionColors: [
      'bg-white/70 backdrop-blur-sm', 'bg-blue-100/60 backdrop-blur-sm', 'bg-purple-100/60 backdrop-blur-sm',
      'bg-indigo-100/60 backdrop-blur-sm', 'bg-cyan-100/60 backdrop-blur-sm', 'bg-pink-100/60 backdrop-blur-sm',
      'bg-violet-100/60 backdrop-blur-sm', 'bg-sky-100/60 backdrop-blur-sm', 'bg-rose-100/60 backdrop-blur-sm',
      'bg-teal-100/60 backdrop-blur-sm'
    ]
  },

  classicNeonGlow: {
    name: 'Neon Glow',
    fonts: {
      title: 'font-black',
      heading: 'font-bold',
      body: 'font-medium'
    },
    colors: {
      primary: 'text-cyan-400',
      secondary: 'text-pink-400',
      accent: 'text-yellow-400',
      background: 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20',
      text: 'text-gray-300',
      titleText: 'text-cyan-800',
      sectionTitle: 'text-white',
      sectionText: 'text-gray-200'
    },
    canvasStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-2',
      borderStyle: 'border-cyan-400/40',
      shadow: 'shadow-2xl shadow-cyan-400/30'
    },
    sectionStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border-2',
      borderStyle: 'border-cyan-400/50',
      shadow: 'shadow-2xl shadow-cyan-400/25'
    },
    sectionColors: [
      'bg-gray-800/80 border-cyan-400/50 shadow-cyan-400/20', 'bg-gray-800/80 border-pink-400/50 shadow-pink-400/20',
      'bg-gray-800/80 border-yellow-400/50 shadow-yellow-400/20', 'bg-gray-800/80 border-green-400/50 shadow-green-400/20',
      'bg-gray-800/80 border-purple-400/50 shadow-purple-400/20', 'bg-gray-800/80 border-blue-400/50 shadow-blue-400/20',
      'bg-gray-800/80 border-red-400/50 shadow-red-400/20', 'bg-gray-800/80 border-orange-400/50 shadow-orange-400/20',
      'bg-gray-800/80 border-indigo-400/50 shadow-indigo-400/20', 'bg-gray-800/80 border-teal-400/50 shadow-teal-400/20'
    ]
  },

  classicGradientMesh: {
    name: 'Gradient Mesh',
    fonts: {
      title: 'font-extrabold',
      heading: 'font-bold',
      body: 'font-medium'
    },
    colors: {
      primary: 'text-purple-700',
      secondary: 'text-pink-600',
      accent: 'text-orange-600',
      background: 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100',
      text: 'text-gray-800',
      titleText: 'text-purple-900',
      sectionTitle: 'text-gray-900',
      sectionText: 'text-gray-700'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-2xl shadow-purple-200/70'
    },
  
    sectionStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-2xl shadow-purple-200/60'
    },
    sectionColors: [
      'bg-gradient-to-br from-purple-200 to-pink-200', 'bg-gradient-to-br from-pink-200 to-orange-200',
      'bg-gradient-to-br from-orange-200 to-yellow-200', 'bg-gradient-to-br from-yellow-200 to-green-200',
      'bg-gradient-to-br from-green-200 to-teal-200', 'bg-gradient-to-br from-teal-200 to-blue-200',
      'bg-gradient-to-br from-blue-200 to-indigo-200', 'bg-gradient-to-br from-indigo-200 to-purple-200',
      'bg-gradient-to-br from-rose-200 to-pink-200', 'bg-gradient-to-br from-cyan-200 to-blue-200'
    ]
  },

  // LAYOUT 2: CORPORATE EXECUTIVE - 3 ATTRACTIVE THEMES
  corporateModernLux: {
    name: 'Modern Luxury',
    fonts: {
      title: 'font-light',
      heading: 'font-normal',
      body: 'font-light'
    },
    colors: {
      primary: 'text-gold-600',
      secondary: 'text-amber-600',
      accent: 'text-yellow-600',
      background: 'bg-gradient-to-br from-slate-50 to-stone-100',
      text: 'text-slate-700',
      titleText: 'text-slate-900',
      sectionTitle: 'text-slate-900',
      sectionText: 'text-slate-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border',
      borderStyle: 'border-gold-300/60',
      shadow: 'shadow-2xl shadow-gold-200/60'
    },
    sectionStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border',
      borderStyle: 'border-gold-200',
      shadow: 'shadow-xl shadow-gold-100/50'
    },
    sectionColors: [
      'bg-gradient-to-br from-white to-gold-50', 'bg-gradient-to-br from-gold-50 to-amber-50',
      'bg-gradient-to-br from-amber-50 to-yellow-50', 'bg-gradient-to-br from-yellow-50 to-orange-50',
      'bg-gradient-to-br from-white to-stone-50', 'bg-gradient-to-br from-stone-50 to-slate-50',
      'bg-gradient-to-br from-slate-50 to-gray-50', 'bg-gradient-to-br from-gray-50 to-zinc-50',
      'bg-gradient-to-br from-zinc-50 to-neutral-50', 'bg-gradient-to-br from-neutral-50 to-white'
    ]
  },

  corporateNeuBrutalism: {
    name: 'Neu-Brutalism',
    fonts: {
      title: 'font-black',
      heading: 'font-extrabold',
      body: 'font-bold'
    },
    colors: {
      primary: 'text-black',
      secondary: 'text-gray-900',
      accent: 'text-red-600',
      background: 'bg-white',
      text: 'text-black',
      titleText: 'text-black',
      sectionTitle: 'text-black',
      sectionText: 'text-gray-900'
    },
    canvasStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border-8',
      borderStyle: 'border-black',
      shadow: 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
    },
    sectionStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border-4',
      borderStyle: 'border-black',
      shadow: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
    },
    sectionColors: [
      'bg-yellow-300 border-black', 'bg-red-300 border-black', 'bg-blue-300 border-black',
      'bg-green-300 border-black', 'bg-purple-300 border-black', 'bg-pink-300 border-black',
      'bg-orange-300 border-black', 'bg-cyan-300 border-black', 'bg-lime-300 border-black',
      'bg-indigo-300 border-black'
    ]
  },

  corporateMinimalChic: {
    name: 'Minimal Chic',
    fonts: {
      title: 'font-thin',
      heading: 'font-extralight',
      body: 'font-light'
    },
    colors: {
      primary: 'text-rose-400',
      secondary: 'text-pink-400',
      accent: 'text-purple-400',
      background: 'bg-gradient-to-br from-gray-50 to-rose-50',
      text: 'text-gray-600',
      titleText: 'text-gray-900',
      sectionTitle: 'text-gray-800',
      sectionText: 'text-gray-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border',
      borderStyle: 'border-gray-200/80',
      shadow: 'shadow-xl shadow-rose-100/40'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border',
      borderStyle: 'border-gray-100',
      shadow: 'shadow-lg shadow-rose-100/30'
    },
    // sectionColors: [
    //   'bg-violet-50/90', 'bg-rose-50/80', 'bg-pink-50/80', 'bg-purple-50/80',
    //   'bg-indigo-50/80', 'bg-blue-50/80', 'bg-cyan-50/80', 'bg-teal-50/80',
    //   'bg-green-50/80', 'bg-gray-50/90'
    // ]
    sectionColors:
    [
      'bg-gradient-to-br from-gray-900/90 to-red-600/90 border-gradient-to-r from-yellow-400/60 to-red-500/60',       // Red + Warm Yellow
      'bg-gradient-to-br from-gray-900/90 to-blue-600/90 border-gradient-to-r from-blue-400/60 to-cyan-500/60',      // Blue + Cyan
      'bg-gradient-to-br from-gray-900/90 to-green-600/90 border-gradient-to-r from-lime-400/60 to-emerald-500/60',  // Green + Lime
      'bg-gradient-to-br from-gray-900/90 to-orange-500/90 border-gradient-to-r from-amber-400/60 to-orange-600/60', // Orange + Amber
      'bg-gradient-to-br from-gray-900/90 to-pink-600/90 border-gradient-to-r from-rose-400/60 to-pink-500/60',      // Pink + Rose
      'bg-gradient-to-br from-gray-900/90 to-teal-600/90 border-gradient-to-r from-teal-400/60 to-sky-500/60',       // Teal + Sky Blue
      'bg-gradient-to-br from-gray-900/90 to-purple-700/90 border-gradient-to-r from-violet-400/60 to-indigo-500/60',// Purple + Indigo
      'bg-gradient-to-br from-gray-900/90 to-yellow-500/90 border-gradient-to-r from-yellow-400/60 to-orange-500/60',// Yellow + Orange
      'bg-gradient-to-br from-gray-900/90 to-rose-600/90 border-gradient-to-r from-pink-300/60 to-red-400/60',       // Rose + Light Red
      'bg-gradient-to-br from-gray-900/90 to-cyan-600/90 border-gradient-to-r from-sky-400/60 to-blue-500/60'        // Cyan + Blue
    ]
  },

  // LAYOUT 3: CREATIVE AGENCY - 3 ATTRACTIVE THEMES
  creativeRetroWave: {
    name: 'Retro Wave',
    fonts: {
      title: 'font-black',
      heading: 'font-bold',
      body: 'font-semibold'
    },
    colors: {
      primary: 'text-pink-400',
      secondary: 'text-cyan-400',
      accent: 'text-yellow-400',
      background: 'bg-gradient-to-br from-purple-900 via-pink-900/50 to-cyan-900/50',
      text: 'text-pink-300',
      titleText: 'text-pink-100',
      sectionTitle: 'text-white',
      sectionText: 'text-pink-200'
    },
    canvasStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border-2',
      borderStyle: 'border-pink-400/40',
      shadow: 'shadow-2xl shadow-pink-500/40'
    },
    sectionStyles: {
      borderRadius: 'rounded-lg',
      borderWidth: 'border-2',
      borderStyle: 'border-pink-400/60',
      shadow: 'shadow-2xl shadow-pink-500/30'
    },
    sectionColors: [
      'bg-gradient-to-br from-purple-800/80 to-pink-800/80 border-pink-400/60',
      'bg-gradient-to-br from-pink-800/80 to-cyan-800/80 border-cyan-400/60',
      'bg-gradient-to-br from-cyan-800/80 to-blue-800/80 border-blue-400/60',
      'bg-gradient-to-br from-blue-800/80 to-purple-800/80 border-purple-400/60',
      'bg-gradient-to-br from-yellow-800/80 to-orange-800/80 border-yellow-400/60',
      'bg-gradient-to-br from-green-800/80 to-teal-800/80 border-green-400/60',
      'bg-gradient-to-br from-red-800/80 to-pink-800/80 border-red-400/60',
      'bg-gradient-to-br from-indigo-800/80 to-purple-800/80 border-indigo-400/60',
      'bg-gradient-to-br from-teal-800/80 to-cyan-800/80 border-teal-400/60',
      'bg-gradient-to-br from-orange-800/80 to-red-800/80 border-orange-400/60'
    ]
  },

  creativeWatercolor: {
    name: 'Watercolor',
    fonts: {
      title: 'font-serif font-bold',
      heading: 'font-serif font-semibold',
      body: 'font-sans font-normal'
    },
    colors: {
      primary: 'text-rose-600',
      secondary: 'text-orange-600',
      accent: 'text-purple-600',
      background: 'bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50',
      text: 'text-gray-700',
      titleText: 'text-rose-800',
      sectionTitle: 'text-gray-800',
      sectionText: 'text-gray-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-2xl shadow-rose-200/50'
    },
    sectionStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-xl shadow-rose-200/40'
    },
    sectionColors: [
      'bg-gradient-to-br from-rose-100/70 via-pink-100/70 to-red-100/70',
      'bg-gradient-to-br from-orange-100/70 via-amber-100/70 to-yellow-100/70',
      'bg-gradient-to-br from-purple-100/70 via-violet-100/70 to-indigo-100/70',
      'bg-gradient-to-br from-blue-100/70 via-sky-100/70 to-cyan-100/70',
      'bg-gradient-to-br from-green-100/70 via-emerald-100/70 to-teal-100/70',
      'bg-gradient-to-br from-blue-100/70 via-brown-100/70 to-brown-100/70',
      'bg-gradient-to-br from-yellow-100/70 via-lime-100/70 to-green-100/70',
      'bg-gradient-to-br from-indigo-100/70 via-purple-100/70 to-pink-100/70',
      'bg-gradient-to-br from-cyan-100/70 via-teal-100/70 to-green-100/70',
      'bg-gradient-to-br from-violet-100/70 via-purple-100/70 to-pink-100/70'
    ]
  },

  creativeHolographic: {
    name: 'Holographic',
    fonts: {
      title: 'font-black',
      heading: 'font-extrabold',
      body: 'font-bold'
    },
    colors: {
      primary: 'text-pink-500',             
      secondary: 'text-blue-500',          
      accent: 'text-green-500',
      background: 'bg-gray-900',            
      text: 'text-gray-200',               
      titleText: 'text-pink-400',          
      sectionTitle: 'text-white',          
      sectionText: 'text-gray-300'          
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-2',
      borderStyle: 'border-pink-700',       
      shadow: 'shadow-xl shadow-pink-800'   
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border',
      borderStyle: 'border-violet-700',    
      shadow: 'shadow-xl shadow-violet-800' 
    },
    sectionColors: 
      [
        'bg-gray-800 border border-gray-600',
        'bg-red-900 border border-rose-700',
        'bg-blue-900 border border-indigo-700',
        'bg-green-900 border border-emerald-700',
        'bg-yellow-900 border border-amber-700',
        'bg-teal-900 border border-cyan-700',
        'bg-purple-900 border border-violet-700',
        'bg-orange-900 border border-amber-800',
        'bg-rose-900 border border-pink-700',
        'bg-lime-900 border border-lime-700'
      ]
      
    
  },

  // LAYOUT 4: MINIMAL GRID - 3 ATTRACTIVE THEMES
  minimalScandinavian: {
    name: 'Scandinavian',
    fonts: {
      title: 'font-light',
      heading: 'font-normal',
      body: 'font-light'
    },
    colors: {
      primary: 'text-slate-600',
      secondary: 'text-blue-600',
      accent: 'text-green-600',
      background: 'bg-white',
      text: 'text-slate-600',
      titleText: 'text-slate-800',
      sectionTitle: 'text-slate-700',
      sectionText: 'text-slate-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border',
      borderStyle: 'border-slate-300',
      shadow: 'shadow-lg shadow-slate-200/60'
    },
    sectionStyles: {
      borderRadius: 'rounded-lg',
      borderWidth: 'border',
      borderStyle: 'border-slate-200',
      shadow: 'shadow-sm'
    },
    sectionColors: [
      'bg-white', 'bg-slate-50', 'bg-blue-50', 'bg-green-50',
      'bg-yellow-50', 'bg-red-50', 'bg-purple-50', 'bg-pink-50',
      'bg-orange-50', 'bg-teal-50'
    ]
  },

  minimalJapanese: {
    name: 'Japanese Zen',
    fonts: {
      title: 'font-extralight',
      heading: 'font-light',
      body: 'font-normal'
    },
    colors: {
      primary: 'text-red-700',
      secondary: 'text-orange-700',
      accent: 'text-yellow-700',
      background: 'bg-gradient-to-br from-stone-50 to-amber-50',
      text: 'text-stone-700',
      titleText: 'text-stone-900',
      sectionTitle: 'text-stone-800',
      sectionText: 'text-stone-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border-t-8',
      borderStyle: 'border-red-500',
      shadow: 'shadow-none'
    },
    sectionStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border-l-4',
      borderStyle: 'border-red-400',
      shadow: 'shadow-none'
    },
    sectionColors: [
      'bg-white border-l-red-400', 'bg-stone-50 border-l-orange-400', 'bg-amber-50 border-l-yellow-400',
      'bg-red-50 border-l-red-500', 'bg-orange-50 border-l-orange-500', 'bg-yellow-50 border-l-yellow-500',
      'bg-rose-50 border-l-rose-400', 'bg-pink-50 border-l-pink-400', 'bg-purple-50 border-l-purple-400',
      'bg-indigo-50 border-l-indigo-400'
    ]
  },

  minimalSwiss: {
    name: 'Swiss Design',
    fonts: {
      title: 'font-bold',
      heading: 'font-semibold',
      body: 'font-normal'
    },
    colors: {
      primary: 'text-red-600',
      secondary: 'text-black',
      accent: 'text-gray-800',
      background: 'bg-white',
      text: 'text-black',
      titleText: 'text-black',
      sectionTitle: 'text-black',
      sectionText: 'text-gray-800'
    },
    canvasStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border-2',
      borderStyle: 'border-black',
      shadow: 'shadow-none'
    },
    sectionStyles: {
      borderRadius: 'rounded-none',
      borderWidth: 'border',
      borderStyle: 'border-black',
      shadow: 'shadow-none'
    },
    sectionColors: [
      'bg-white border-black', 'bg-red-100 border-black', 'bg-gray-100 border-black',
      'bg-yellow-100 border-black', 'bg-blue-100 border-black', 'bg-green-100 border-black',
      'bg-orange-100 border-black', 'bg-purple-100 border-black', 'bg-pink-100 border-black',
      'bg-cyan-100 border-black'
    ]
  },

  // LAYOUT 5: TECH INNOVATION - 3 ATTRACTIVE THEMES
  techCyberpunk: {
    name: 'Cyberpunk',
    fonts: {
      title: 'font-mono font-black',
      heading: 'font-mono font-bold',
      body: 'font-mono font-medium'
    },
    colors: {
      primary: 'text-cyan-400',
      secondary: 'text-pink-400',
      accent: 'text-yellow-400',
      background: 'bg-gradient-to-br from-gray-900 via-purple-900/30 to-pink-900/30',
      text: 'text-cyan-300',
      titleText: 'text-cyan-300',
      sectionTitle: 'text-white',
      sectionText: 'text-gray-200'
    },
    sectionStyles: {
      borderRadius: 'rounded-lg',
      borderWidth: 'border-2',
      borderStyle: 'border-cyan-400/50',
      shadow: 'shadow-2xl shadow-cyan-400/25'
    },
    canvasStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border-2',
      borderStyle: 'border-cyan-400/40',
      shadow: 'shadow-2xl shadow-cyan-400/30'
    },
    sectionColors: [
      'bg-gray-900/90 border-cyan-400/60 shadow-cyan-400/20',
      'bg-gray-900/90 border-pink-400/60 shadow-pink-400/20',
      'bg-gray-900/90 border-yellow-400/60 shadow-yellow-400/20',
      'bg-gray-900/90 border-green-400/60 shadow-green-400/20',
      'bg-gray-900/90 border-purple-400/60 shadow-purple-400/20',
      'bg-gray-900/90 border-blue-400/60 shadow-blue-400/20',
      'bg-gray-900/90 border-red-400/60 shadow-red-400/20',
      'bg-gray-900/90 border-orange-400/60 shadow-orange-400/20',
      'bg-gray-900/90 border-indigo-400/60 shadow-indigo-400/20',
      'bg-gray-900/90 border-teal-400/60 shadow-teal-400/20'
    ]
  },

  techNeuomorphism: {
    name: 'Neuomorphism',
    fonts: {
      title: 'font-semibold',
      heading: 'font-medium',
      body: 'font-normal'
    },
    colors: {
      primary: 'text-blue-600',
      secondary: 'text-indigo-600',
      accent: 'text-purple-600',
      background: 'bg-gray-100',
      text: 'text-gray-700',
      titleText: 'text-blue-900',
      sectionTitle: 'text-gray-800',
      sectionText: 'text-gray-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-[inset_-16px_-12px_50px_#46464620,inset_16px_12px_50px_#ffffff70,_-16px_-12px_50px_#46464620,_16px_12px_50px_#ffffff70]'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-[inset_-12px_-8px_40px_#46464620,inset_12px_8px_40px_#ffffff70,_-12px_-8px_40px_#46464620,_12px_8px_40px_#ffffff70]'
    },
    sectionColors: [
      'bg-gray-100', 'bg-blue-100', 'bg-indigo-100', 'bg-purple-100',
      'bg-pink-100', 'bg-red-100', 'bg-orange-100', 'bg-yellow-100',
      'bg-green-100', 'bg-teal-100'
    ]
  },

  techQuantum: {
    name: 'Quantum',
    fonts: {
      title: 'font-thin',
      heading: 'font-extralight',
      body: 'font-light'
    },
    colors: {
      primary: 'text-violet-400',
      secondary: 'text-blue-400',
      accent: 'text-cyan-400',
      background: 'bg-gradient-to-br from-slate-900 via-violet-900/20 to-blue-900/20',
      text: 'text-slate-300',
      titleText: 'text-blue-500',
      sectionTitle: 'text-slate-100',
      sectionText: 'text-slate-300'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-2',
      borderStyle: 'border-violet-400/40',
      shadow: 'shadow-2xl shadow-violet-500/30'
    },
    sectionStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border',
      borderStyle: 'border-violet-400/30',
      shadow: 'shadow-2xl shadow-violet-500/20'
    },
    sectionColors: [
      'bg-slate-800/60 backdrop-blur-sm border-violet-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-blue-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-cyan-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-purple-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-indigo-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-pink-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-teal-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-green-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-yellow-400/40',
      'bg-slate-800/60 backdrop-blur-sm border-red-400/40'
    ]
  },

  // LAYOUT 6: STARTUP LEAN CANVAS - 3 ATTRACTIVE THEMES
  startupVaporwave: {
    name: 'Vaporwave',
    fonts: {
      title: 'font-black',
      heading: 'font-bold',
      body: 'font-semibold'
    },
    colors: {
      primary: 'text-pink-400',
      secondary: 'text-purple-400',
      accent: 'text-cyan-400',
      background: 'bg-gradient-to-br from-purple-900 via-pink-900/50 to-blue-900/50',
      text: 'text-pink-300',
      titleText: 'text-pink-200',
      sectionTitle: 'text-white',
      sectionText: 'text-pink-200'
    },
    canvasStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-2',
      borderStyle: 'border-pink-400/40',
      shadow: 'shadow-2xl shadow-pink-500/40'
    },
    sectionStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border-2',
      borderStyle: 'border-pink-400/50',
      shadow: 'shadow-2xl shadow-pink-500/30'
    },
    

    sectionColors: [
      'bg-gradient-to-br from-purple-800/80 to-pink-800/80 border-pink-400/60',
      'bg-gradient-to-br from-pink-800/80 to-blue-800/80 border-blue-400/60',
      'bg-gradient-to-br from-blue-800/80 to-cyan-800/80 border-cyan-400/60',
      'bg-gradient-to-br from-cyan-800/80 to-teal-800/80 border-teal-400/60',
      'bg-gradient-to-br from-purple-800/80 to-indigo-800/80 border-purple-400/60',
      'bg-gradient-to-br from-indigo-800/80 to-blue-800/80 border-indigo-400/60',
      'bg-gradient-to-br from-pink-800/80 to-rose-800/80 border-rose-400/60',
      'bg-gradient-to-br from-violet-800/80 to-purple-800/80 border-violet-400/60',
      'bg-gradient-to-br from-fuchsia-800/80 to-pink-800/80 border-fuchsia-400/60',
      'bg-gradient-to-br from-sky-800/80 to-blue-800/80 border-sky-400/60'
    ]
  },

  startupSunset: {
    name: 'Sunset Vibes',
    fonts: {
      title: 'font-bold',
      heading: 'font-semibold',
      body: 'font-medium'
    },
    colors: {
      primary: 'text-orange-600',
      secondary: 'text-red-600',
      accent: 'text-yellow-600',
      background: 'bg-gradient-to-br from-orange-100 via-red-50 to-pink-100',
      text: 'text-orange-800',
      titleText: 'text-orange-900',
      sectionTitle: 'text-gray-900',
      sectionText: 'text-gray-700'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-2xl shadow-orange-200/60'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-0',
      borderStyle: '',
      shadow: 'shadow-xl shadow-orange-200/50'
    },
    sectionColors: [
      'bg-gradient-to-br from-orange-200 to-red-200', 'bg-gradient-to-br from-red-200 to-pink-200',
      'bg-gradient-to-br from-pink-200 to-rose-200', 'bg-gradient-to-br from-yellow-200 to-orange-200',
      'bg-gradient-to-br from-amber-200 to-yellow-200', 'bg-gradient-to-br from-rose-200 to-pink-200',
      'bg-gradient-to-br from-orange-200 to-amber-200', 'bg-gradient-to-br from-red-200 to-rose-200',
      'bg-gradient-to-br from-pink-200 to-fuchsia-200', 'bg-gradient-to-br from-yellow-200 to-lime-200'
    ]
  },

  startupAurora: {
    name: 'Aurora Borealis',
    fonts: {
      title: 'font-semibold',
      heading: 'font-medium',
      body: 'font-normal'
    },
    colors: {
      primary: 'text-green-400',
      secondary: 'text-blue-400',
      accent: 'text-purple-400',
      background: 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50',
      text: 'text-gray-700',
      titleText: 'text-gray-900',
      sectionTitle: 'text-gray-800',
      sectionText: 'text-gray-600'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-2',
      borderStyle: 'border-green-300/60',
      shadow: 'shadow-2xl shadow-green-200/50'
    },
    sectionStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border',
      borderStyle: 'border-green-200',
      shadow: 'shadow-xl shadow-green-200/40'
    },
    sectionColors: [
      'bg-gradient-to-br from-green-100/80 to-teal-100/80', 'bg-gradient-to-br from-teal-100/80 to-cyan-100/80',
      'bg-gradient-to-br from-cyan-100/80 to-blue-100/80', 'bg-gradient-to-br from-blue-100/80 to-indigo-100/80',
      'bg-gradient-to-br from-indigo-100/80 to-purple-100/80', 'bg-gradient-to-br from-purple-100/80 to-violet-100/80',
      'bg-gradient-to-br from-violet-100/80 to-pink-100/80', 'bg-gradient-to-br from-pink-100/80 to-rose-100/80',
      'bg-gradient-to-br from-emerald-100/80 to-green-100/80', 'bg-gradient-to-br from-lime-100/80 to-green-100/80'
    ]
  },
  sandDunes: {
    name: 'Sand Dunes',
    fonts: {
      title: 'font-serif font-extrabold tracking-wide',
      heading: 'font-serif font-bold',
      body: 'font-sans font-normal'
    },
    colors: {
      primary: 'text-amber-300',
      secondary: 'text-rose-400',
      accent: 'text-sky-400',
      background: 'bg-gradient-to-br from-yellow-200/50 via-amber-700/80 to-orange-400/60',
      text: 'text-amber-100',
      titleText: 'text-sky-500',
      sectionTitle: 'text-yellow-200',
      sectionText: 'text-amber-300'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-2',
      borderStyle: 'border-amber-600/50',
      shadow: 'shadow-2xl shadow-amber-900/50'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-2',
      borderStyle: 'border-amber-700/60',
      shadow: 'shadow-2xl shadow-amber-900/40'
    },
    sectionColors: [
      'bg-gradient-to-br from-yellow-900/90 to-amber-800/80 border-amber-700/60', // Warm sandy yellow
      'bg-gradient-to-br from-rose-800/90 to-pink-800/80 border-rose-700/60', // Desert sunset pink
      'bg-gradient-to-br from-sky-800/90 to-blue-800/80 border-sky-700/60', // Desert sky blue
      'bg-gradient-to-br from-orange-900/90 to-red-900/80 border-orange-800/60', // Desert sunset orange
      'bg-gradient-to-br from-purple-900/90 to-violet-900/80 border-purple-800/60', // Twilight purple
      'bg-gradient-to-br from-teal-800/90 to-cyan-800/80 border-teal-700/60', // Oasis teal
      'bg-gradient-to-br from-emerald-800/90 to-green-800/80 border-emerald-700/60', // Desert cactus green
      'bg-gradient-to-br from-indigo-900/90 to-blue-900/80 border-indigo-800/60', // Night sky indigo
      'bg-gradient-to-br from-fuchsia-900/90 to-pink-900/80 border-fuchsia-800/60', // Desert flower magenta
      'bg-gradient-to-br from-lime-800/90 to-yellow-800/80 border-lime-700/60' // Desert grass lime
    ]
  },

  rockCanyon: {
    name: 'Rock Canyon',
    fonts: {
      title: 'font-sans font-black tracking-widest uppercase',
      heading: 'font-sans font-bold',
      body: 'font-sans font-normal'
    },
    colors: {
      primary: 'text-stone-300',
      secondary: 'text-emerald-400',
      accent: 'text-amber-500',
      background: 'bg-gradient-to-br from-gray-900 via-stone-900/80 to-red-900/80',
      text: 'text-stone-200',
      titleText: 'text-orange-600',
      sectionTitle: 'text-red-200',
      sectionText: 'text-stone-300'
    },
    canvasStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-2',
      borderStyle: 'border-stone-600/50',
      shadow: 'shadow-2xl shadow-red-900/50'
    },
    sectionStyles: {
      borderRadius: 'rounded-xl',
      borderWidth: 'border-2',
      borderStyle: 'border-stone-700/60',
      shadow: 'shadow-2xl shadow-red-900/40'
    },
    sectionColors: [
      'bg-gradient-to-br from-gray-900/90 to-stone-800/80 border-stone-700/60', // Classic stone gray
      'bg-gradient-to-br from-red-800/90 to-rose-800/80 border-red-700/60', // Canyon red rock
      'bg-gradient-to-br from-emerald-800/90 to-green-800/80 border-emerald-700/60', // Moss and lichen green
      'bg-gradient-to-br from-amber-900/90 to-yellow-900/80 border-amber-800/60', // Golden canyon walls
      'bg-gradient-to-br from-purple-900/90 to-violet-900/80 border-purple-800/60', // Sunset canyon purple
      'bg-gradient-to-br from-cyan-800/90 to-blue-800/80 border-cyan-700/60', // River canyon blue
      'bg-gradient-to-br from-orange-900/90 to-red-900/80 border-orange-800/60', // Rust colored rock
      'bg-gradient-to-br from-teal-800/90 to-emerald-800/80 border-teal-700/60', // Water-carved stone teal
      'bg-gradient-to-br from-pink-900/90 to-rose-900/80 border-pink-800/60', // Desert rose pink
      'bg-gradient-to-br from-indigo-900/90 to-blue-900/80 border-indigo-800/60' // Deep canyon shadow indigo
    ]
  },

  midnightForest: {
    name: 'Midnight Forest',
    fonts: {
      title: 'font-serif font-black italic',
      heading: 'font-serif font-bold italic',
      body: 'font-sans font-medium'
    },
    colors: {
      primary: 'text-emerald-300',
      secondary: 'text-indigo-300',
      accent: 'text-amber-300',
      background: 'bg-gradient-to-br from-slate-900 via-emerald-900/60 to-indigo-900/70',
      text: 'text-slate-100',
      titleText: 'text-emerald-500',
      sectionTitle: 'text-slate-200',
      sectionText: 'text-slate-100'
    },
    canvasStyles: {
      borderRadius: 'rounded-3xl',
      borderWidth: 'border-2',
      borderStyle: 'border-emerald-500/40',
      shadow: 'shadow-2xl shadow-black/60'
    },
    sectionStyles: {
      borderRadius: 'rounded-2xl',
      borderWidth: 'border-2',
      borderStyle: 'border-emerald-600/40',
      shadow: 'shadow-xl shadow-black/50'
    },
    sectionColors: [

      'bg-gradient-to-br from-emerald-800/95 to-emerald-900/90 border-emerald-500/50',
      'bg-gradient-to-br from-indigo-800/95 to-indigo-900/90 border-indigo-500/50',
      'bg-gradient-to-br from-teal-800/95 to-teal-900/90 border-teal-500/50',
      'bg-gradient-to-br from-amber-900/95 to-yellow-900/90 border-amber-600/50',
      'bg-gradient-to-br from-purple-800/95 to-purple-900/90 border-purple-500/50',
      'bg-gradient-to-br from-cyan-800/95 to-cyan-900/90 border-cyan-500/50',

      'bg-gradient-to-br from-rose-800/95 to-rose-900/90 border-rose-500/50',
      'bg-gradient-to-br from-green-800/95 to-green-900/90 border-green-500/50',
      'bg-gradient-to-br from-violet-800/95 to-violet-900/90 border-violet-500/50',
      'bg-gradient-to-br from-slate-700/95 to-slate-800/90 border-slate-500/50'
    ]
  }
};