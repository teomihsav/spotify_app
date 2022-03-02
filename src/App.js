



import { BrowserRouter, Routes, Route } from "react-router-dom";

import ArtistsSearch from './Fetch_Artists/ArtistsSearch'
import ArtistAlbums from './Fetch_Artists/ArtistAlbums'
import Tracks from './Fetch_Artists/Tracks';


function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<ArtistsSearch />} />
      <Route path="/ArtistAlbums/:slug" element={<ArtistAlbums />} />
      <Route path="/Tracks/:slug" element={<Tracks />} />
    </Routes>
  </BrowserRouter>

}

export default App
