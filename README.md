# Zeno - Gestão de Produtos

Aplicação de gestão de produtos construída com **Next.js** e **Tailwind CSS** como parte do teste técnico da Zeno.

## Funcionalidades

- ✅ Listar produtos com paginação
- ✅ Criar novo produto
- ✅ Visualizar detalhes do produto
- ✅ Editar produto
- ✅ Deletar produto
- ✅ Busca por nome e descrição
- ✅ Selecionar itens por página

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

## API

Base URL: `https://backend-nodejs-q65c.onrender.com`

## Deploy

Aplicação disponível em: _[inserir link do deploy]_
