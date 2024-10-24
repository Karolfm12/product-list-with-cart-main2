/// <reference types="vite/client" />

interface ImportMetaEnv {
  BASE_URL: string;
  // Dodaj inne zmienne środowiskowe, jeśli masz
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
