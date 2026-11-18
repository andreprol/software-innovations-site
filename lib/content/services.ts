export type ServiceCategory = {
  slug: string
  title: string
  description: string
  highlight?: boolean
  items: string[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'desenvolvimento-sob-medida',
    title: 'Desenvolvimento de Software sob Medida',
    highlight: true,
    description: 'Sistemas, produtos e integrações desenvolvidos sob medida para a necessidade real do seu negócio.',
    items: ['Sistemas web e mobile sob medida', 'Integrações e automações', 'Produtos SaaS próprios'],
  },
  {
    slug: 'fiscal-documentos',
    title: 'Fiscal & Documentos Eletrônicos',
    description: 'Emissão, leitura e gestão de documentos fiscais eletrônicos.',
    items: ['Emissão de NF-e/NFS-e', 'Leitura e gestão de XML', 'Relatórios fiscais automatizados'],
  },
  {
    slug: 'gestao-rh',
    title: 'Gestão Corporativa & RH',
    description: 'Sistemas de gestão interna e de pessoal.',
    items: ['Sistemas de departamento pessoal', 'Controle de ponto', 'Portais internos'],
  },
  {
    slug: 'erp-integracoes',
    title: 'ERP & Integrações',
    description: 'Integração de sistemas corporativos e ERP.',
    items: ['Integração com SAP Business One', 'Integração com portais de parceiros e fornecedores'],
  },
  {
    slug: 'infraestrutura-redes',
    title: 'Infraestrutura & Redes',
    description: 'Gerenciamento de máquinas e infraestrutura de rede em escala.',
    items: ['Gerenciamento remoto de máquinas em escala', 'Rede estruturada', 'Venda de hardware'],
  },
  {
    slug: 'marketing-reputacao',
    title: 'Marketing Digital & Reputação Online',
    description: 'Presença digital e reputação online.',
    items: ['Disparo de e-mail marketing', 'SEO', 'Gestão e monitoramento de reputação online'],
  },
  {
    slug: 'ecommerce-sites',
    title: 'E-commerce & Sites Institucionais',
    description: 'Lojas virtuais e sites institucionais modernos.',
    items: ['Lojas virtuais', 'Sites institucionais', 'Landing pages'],
  },
]
