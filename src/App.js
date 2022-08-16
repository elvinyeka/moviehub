import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import ErrorPage from "./pages/ErrorPage";
import Movies from "./pages/Movies";
import SearchPage from "./pages/SearchPage";
import Series from "./pages/Series";
import Trending from "./pages/Trending";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <div className="wrapper">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="movies" element={<Movies />} />
              <Route path="series" element={<Series />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </div>
      </main>

      <MainNav />
    </BrowserRouter>
  );
}

export default App;
