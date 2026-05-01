import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import CookieConsentDialog from "./components/CookieConsentDialog.jsx";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import CharacterDetail from "./pages/CharacterDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <FavoritesProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { background: "#0b1220", color: "#e2e8f0", border: "1px solid #1f2937" },
        }}
      />

      <CookieConsentDialog />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </FavoritesProvider>
  );
}