import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addGame, deleteGame } from "../../redux/product/productOperations";
import { selectItems } from "../../redux/product/productSelectors";
export default function GameSearch() {
  const [gameName, setGameName] = useState("");
  const dispatch = useDispatch();
  const gameList = useSelector(selectItems);

  const searchSubmit = (e) => {
    e.preventDefault(); // Form submit işleminde sayfa yenilenmesini önler

    if (!gameName.trim()) {
      alert("Lütfen bir oyun adı girin.");
      return;
    }

    const formattedGame = gameName.toLowerCase().trim().replace(/\s+/g, "-");

    dispatch(addGame({ name: formattedGame }));
    setGameName("");

    const gameUrl = `https://www.rekoroyun.com/${formattedGame}.html`;
    window.open(gameUrl, "_blank");
  };

  const handleSaveGame = () => {
    if (!gameName.trim()) {
      alert("Lütfen bir oyun adı girin.");
      return;
    }

    const formattedGame = gameName.toLowerCase().trim().replace(/\s+/g, "-");

    const newGame = {
      id: Date.now(),
      title: gameName.trim(),
      price: 0.0,
      description: `${gameName.trim()} oyunu için otomatik açıklama.`,
      category: "games",
      image: `https://www.rekoroyun.com/img/oyunlar/${formattedGame}.jpg`,
    };

    dispatch(addGame(newGame));
    alert("Oyun kaydedildi!");
  };

  const deleteClick = (id)=>{
    dispatch(deleteGame(id))
  }

  return (
    <div>
      <div>
        <form onSubmit={searchSubmit}>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Oyun adı girin"
          />
        </form>
        <button onClick={handleSaveGame}>Kaydet</button>
      </div>

      <ol>
        <li>
          <a
            href="https://www.rekoroyun.com/klasik-tetris.html"
            target="_blank"
            className="arrow"
          >
            <FaArrowRight /> Tetris
          </a>
        </li>
        <li>
          <a
            href="https://www.rekoroyun.com/super-mario.html"
            target="_blank"
            className="arrow"
          >
            <FaArrowRight /> Super Mario
          </a>
        </li>
        <li>
          <a
            href="https://www.rekoroyun.com/ates-ve-su.html"
            target="_blank"
            className="arrow"
          >
            <FaArrowRight /> Ateş ve Su
          </a>
        </li>
        <li>
          <a
            href="https://www.rekoroyun.com/tokat-atma.html"
            target="_blank"
            className="arrow"
          >
            <FaArrowRight /> Tokat Atma!
          </a>
        </li>
        <li>
          <a
            href="https://www.rekoroyun.com/street-fighter.html"
            target="_blank"
            className="arrow"
          >
            <FaArrowRight /> Street Fighter
          </a>
        </li>
      </ol>

      <ul>
        {gameList.map((game) => {
          return (
            <li key={game.id}>
              <a
                href={`https://www.rekoroyun.com/${game.title}.html`}
                target="blank"
                className="arrow"
              >
                <FaArrowRight /> {game.title}
              </a>
              <button onClick={()=>deleteClick(game.id)} >Sil</button>
            </li>
            
          );
        })}
      </ul>
    </div>
  );
}
