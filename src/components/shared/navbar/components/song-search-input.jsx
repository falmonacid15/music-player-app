import { Input, Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";

import SearchDropDownItem from "./search-dropdown-item";
import { useMusicAppStore } from "@/store/music-app-store";

function SongSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  let timerId = useRef(null);

  const { setCurrentPlaying } = useMusicAppStore();

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://saavn.dev/api/search/songs?query=${search}&page=0&limit=10`
      );
      setResults(res.data.data.results);
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      handleSearch();
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (results.length > 0) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
    }
  }, [results]);

  const handleBlur = () => {
    timerId.current = setTimeout(() => {
      if (
        !document.activeElement.isSameNode(inputRef.current) &&
        !dropdownRef.current?.contains(document.activeElement)
      ) {
        setDropDownOpen(false);
      }
    }, 100);
  };

  const handleFocus = () => {
    clearTimeout(timerId.current);
    setDropDownOpen(true);
  };

  return (
    <div className="relative w-[200px] sm:w-[340px]">
      <Input
        ref={inputRef}
        isClearable
        placeholder="Busque una cancion, artista o album"
        variant="underlined"
        startContent={
          !isSearching ? (
            <IoSearch className="text-xl" />
          ) : (
            <Spinner size="sm" color="primary" />
          )
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => setDropDownOpen(true)}
        value={search}
        onClear={() => setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
      />
      {dropDownOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`mt-2 absolute top-full left-0 w-full  rounded-md shadow-lg z-10`}
        >
          <Listbox aria-label="Actions" className="bg-content2">
            {results.map((result) => (
              <ListboxItem
                key={result.id}
                className="p-2 bg-content2"
                onPress={() => {
                  setCurrentPlaying({
                    idApi: result.id,
                    title: result.name,
                    album: result.album.name,
                    artist: result.artists.primary[0].name,
                    image: result.image[2].url,
                    url: result.downloadUrl[4].url,
                  });
                  setDropDownOpen(false);
                }}
              >
                <SearchDropDownItem
                  key={result.id}
                  name={result.name}
                  album={result.album.name}
                  artists={result.artists.primary[0].name}
                  image={result.image[2].url}
                  idApi={result.id}
                  url={result.downloadUrl[4].url}
                />
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      )}
    </div>
  );
}

export default SongSearch;
