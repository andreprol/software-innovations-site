export type PortfolioItem = {
  name: string
  description: string
  url?: string
  categorySlug: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: 'RaioX Brasília',
    description: 'Dossiê público de políticos e candidatos brasileiros com dados oficiais do TSE.',
    url: 'https://raioxbrasilia.com.br/',
    categorySlug: 'marketing-reputacao',
  },
  {
    name: 'Uriverse3D',
    description: 'E-commerce de produtos 3D impressos sob demanda.',
    url: 'https://www.uriverse3d.com.br/',
    categorySlug: 'ecommerce-sites',
  },
  {
    name: 'CV Tailor',
    description: 'Gera currículo ATS-safe sob medida para cada vaga, usando IA.',
    url: 'https://github.com/andreprol/cv-tailor',
    categorySlug: 'desenvolvimento-sob-medida',
  },
  {
    name: 'Emissor de NF-e/NFS-e',
    description: 'Sistema de emissão de notas fiscais eletrônicas integrado à SEFAZ.',
    categorySlug: 'fiscal-documentos',
  },
  {
    name: 'Emissor Fiscal para Hardware Express',
    description: 'Sistema de emissão fiscal com autenticação própria para cliente do setor de hardware.',
    categorySlug: 'fiscal-documentos',
  },
  {
    name: 'Leitor de Notas em PDF',
    description: 'Extração automática de dados de notas fiscais em PDF para planilhas.',
    url: 'https://github.com/andreprol/invoice_reader',
    categorySlug: 'fiscal-documentos',
  },
  {
    name: 'Gerenciador de XML Fiscal',
    description: 'Leitura e organização de arquivos XML de notas fiscais.',
    url: 'https://github.com/andreprol/xmlreader',
    categorySlug: 'fiscal-documentos',
  },
  {
    name: 'Sistema de Departamento Pessoal',
    description: 'Gestão de colaboradores, cargos e documentação de RH.',
    url: 'https://github.com/andreprol/sistemadp',
    categorySlug: 'gestao-rh',
  },
  {
    name: 'Ambiente Web de RH',
    description: 'Portal interno de recursos humanos.',
    categorySlug: 'gestao-rh',
  },
  {
    name: 'Integração de Portal com SAP Business One',
    description: 'Automação que elimina erros de reconciliação entre portal de parceiro e ERP.',
    categorySlug: 'erp-integracoes',
  },
  {
    name: 'Atualização Automática via SAP B1/HANA',
    description: 'Serviço de atualização automática de relatórios corporativos direto do ERP.',
    categorySlug: 'erp-integracoes',
  },
  {
    name: 'Delírio Manager',
    description: 'Gestão remota de frota de mais de 150 máquinas em tempo real, com Wake-on-LAN e análise de log por IA.',
    categorySlug: 'infraestrutura-redes',
  },
  {
    name: 'RJ Tecnologia',
    description: 'Site institucional moderno para empresa de tecnologia.',
    url: 'https://www.rjlogisticaetecnologia.com.br/',
    categorySlug: 'ecommerce-sites',
  },
  {
    name: 'EscondaGoogle',
    description: 'Gestão e monitoramento de reputação online na primeira página do Google.',
    url: 'https://escondagoogle.com.br/',
    categorySlug: 'marketing-reputacao',
  },
]
