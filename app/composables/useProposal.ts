export interface Proposal {
  slug: string
  title: string
  date: string
  company: {
    name: string
    tagline: string
  }
  preparedBy: {
    name: string
    email: string
    phone: string
    website: string
  }
  theme: {
    primary: string
    secondary: string
  }
  slides: Array<{
    type: string
    data: any
  }>
}

// Import all proposals using import.meta.glob
const proposalModules = import.meta.glob<{ default: Proposal }>('~/data/proposals/*.json', { 
  eager: true,
  import: 'default'
})

// Create a map of proposals by slug
const proposals = new Map<string, Proposal>()
Object.entries(proposalModules).forEach(([path, proposal]) => {
  proposals.set(proposal.slug, proposal)
})

export const useProposal = (slug: string) => {
  const proposal = proposals.get(slug)
  
  if (!proposal) {
    throw createError({
      statusCode: 404,
      statusMessage: `Proposal not found: ${slug}`
    })
  }
  
  return {
    proposal,
    slides: proposal.slides,
    slideCount: proposal.slides.length
  }
}

export const useAllProposals = () => {
  return Array.from(proposals.values())
}
