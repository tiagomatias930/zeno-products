# Zeno - Gestão de Produtos

Aplicação de gestão de produtos construída com **Next.js** e **Tailwind CSS**


## Stack Técnica

- **Next.js 16** (App Router)
- **React Server Components** e **Server Actions**
- **Tailwind CSS** para estilização
- **TypeScript** para type safety

## Arquitetura

```
src/
├── app/
│   ├── actions/products.ts    # Server Actions (CRUD)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Página principal (RSC)
│   └── loading.tsx            # Loading skeleton
├── components/                # Componentes modulares
├── lib/api.ts                 # API helper functions
└── types/product.ts           # TypeScript interfaces
```

## Como executar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)


