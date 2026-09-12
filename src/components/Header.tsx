import NewProductButton from './NewProductButton';

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Gerencie os produtos da sua loja. Aqui você pode visualizar, editar,
            adicionar ou remover produtos.
          </p>
        </div>
      </div>
      <div className="self-end sm:self-auto">
        <NewProductButton />
      </div>
    </header>
  );
}
