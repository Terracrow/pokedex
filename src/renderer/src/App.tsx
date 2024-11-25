import Right from './assets/right.svg'
import Left from './assets/left.svg'
import Search from './assets/search.svg'
import Star from './assets/star.svg'
import Height from './assets/height.svg'
import Weight from './assets/weight.svg'
import Group from './assets/group.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { ContextMenu } from '@renderer/components/ContextMenu'

import SteelType from './assets/steelt.png'
import WaterType from './assets/watert.png'
import FireType from './assets/firet.png'
import GrassType from './assets/grasst.png'
import RockType from './assets/rockt.png'
import GroundType from './assets/groundt.png'
import IceType from './assets/icet.png'
import FairyType from './assets/fairyt.png'
import DragonType from './assets/dragont.png'
import NormalType from './assets/normalt.png'
import PoisonType from './assets/poisont.png'
import PsychicType from './assets/psychict.png'
import SpecterType from './assets/ghost.png'
import FightType from './assets/fight.png'
import DarkType from './assets/darkt.png'
import BugType from './assets/bugt.png'
import FlyingType from './assets/flyingt.png'
import ElectricType from './assets/electrict.png'

const API_URL = 'https://pokeapi.co/api/v2'

function App(): JSX.Element {
  const interaction = async (k: string): Promise<object> => {
    const _request = await window.fetch(`${API_URL}/pokemon/${k}`)
    const _data = await _request.json()
    const request = await window.fetch(`${API_URL}/pokemon-species/${_data.id}`)
    const data = await request.json()

    return {
      pokemon: _data,
      species: data
    }
  }

  const fetchVariety = async (v: string): Promise<string> => {
    const request = await window.fetch(v)
    return await request.json()
  }

  const [prop, setProp] = useState<object | null>(null)
  const [variety, setVariety] = useState<string | null>(null)
  const [currentSprite, setCurrentSprite] = useState(0)
  const [useShiny, setUseShiny] = useState(false)

  const handleProp = async (p: string): Promise<void> => {
    const q = await handleQuery(p)
    setProp(q)

    if (q.species.varieties.length > 0) {
      const varietyQuery = q.species.varieties[1].pokemon.url
      const _data = await fetchVariety(varietyQuery)
      setVariety(_data)
    }
  }

  const handleQuery = async (e: string): Promise<object> => {
    return await interaction(e)
  }

  const handleSetCurrentSprite = (i: number): void => {
    setCurrentSprite(i)
  }

  const prevSprite = (): void => {
    currentSprite == 0 ? handleSetCurrentSprite(0) : handleSetCurrentSprite(currentSprite - 1)
  }

  const nextSprite = (): void => {
    currentSprite == sprites.length - 1
      ? handleSetCurrentSprite(currentSprite)
      : handleSetCurrentSprite(currentSprite + 1)
  }

  const handleSetUseShiny = (): void => {
    setUseShiny(!useShiny)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sprites = prop
    ? [
        `https://play.pokemonshowdown.com/sprites/ani/${prop!.pokemon.name.toLowerCase()}.gif`,
        `https://play.pokemonshowdown.com/sprites/ani-back/${prop!.pokemon.name.toLowerCase()}.gif`
      ]
    : []

  const shinySprite = prop
    ? [
        `https://play.pokemonshowdown.com/sprites/ani-shiny/${prop!.pokemon.name.toLowerCase()}.gif`,
        `https://play.pokemonshowdown.com/sprites/ani-back-shiny/${prop!.pokemon.name.toLowerCase()}.gif`
      ]
    : []

  const varietySprite = variety
    ? [
        `https://play.pokemonshowdown.com/sprites/ani/${variety.name.toLowerCase()}.gif`,
        `https://play.pokemonshowdown.com/sprites/ani-back/${variety.name.toLowerCase()}.gif`
      ]
    : []

  const varietyShinySprite = variety
    ? [
        `https://play.pokemonshowdown.com/sprites/ani-shiny/${variety.name.toLowerCase()}.gif`,
        `https://play.pokemonshowdown.com/sprites/ani-back-shiny/${variety.name.toLowerCase()}.gif`
      ]
    : []

  const typesAssets = {
    electric: ElectricType,
    normal: NormalType,
    fire: FireType,
    rock: RockType,
    ice: IceType,
    dark: DarkType,
    ghost: SpecterType,
    psychic: PsychicType,
    poison: PoisonType,
    dragon: DragonType,
    fairy: FairyType,
    water: WaterType,
    grass: GrassType,
    bug: BugType,
    steel: SteelType,
    ground: GroundType,
    flying: FlyingType,
    fighting: FightType
  }

  return (
    <>
      <div className="searchContainer">
        <div className="searchBar">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Pikachu"
            onChange={async (e: ChangeEvent<HTMLInputElement>) =>
              handleProp(e.target.value.toLowerCase())
            }
          />
        </div>
      </div>
      {prop && (
        <div className="pokemon-container">
          <div className="pokemon-card">
            <div className="card-elements">
              <div className="id-section">
                <div className="types">
                  {prop!.pokemon.types.map((t) => (
                    <img key={t.slot} src={typesAssets[t.type.name]} alt="" />
                  ))}
                </div>
                <div className="name">{prop!.pokemon.name}</div>
                <div className="dexId">#{prop!.pokemon.id}</div>
              </div>
              <div className="sprites-section">
                <div className="main-sprite">
                  <img
                    src={useShiny ? shinySprite[currentSprite] : sprites[currentSprite]}
                    alt=""
                  />
                </div>
                <div className="sprite-buttons">
                  <div className="sprite-btn">
                    <img src={Left} alt="" onClick={prevSprite} />
                  </div>
                  <div className="sprite-btn">
                    <img src={Right} alt="" onClick={nextSprite} />
                  </div>
                  <div className="sprite-btn">
                    <img src={Star} alt="" onClick={handleSetUseShiny} />
                  </div>
                </div>
              </div>
              <hr />
              <div className="pokemon-details">
                <div className="pokemon-details-el">
                  <img src={Height} alt="" />
                  <span>{prop!.pokemon.height / 10}m</span>
                </div>
                <div className="pokemon-details-el">
                  <img src={Weight} alt="" />
                  <span>{prop!.pokemon.weight / 10}kg</span>
                </div>
                <div className="pokemon-details-el">
                  <img src={Group} alt="" />
                  <span>
                    {prop!.species.genera
                      .find((f) => f.language.name == 'en')
                      .genus.replace('Pokémon', '')}
                  </span>
                </div>
              </div>
              <div className="pokemonStats">
                <div className="statsContainer">
                  <div className="stat-element">
                    <div className="statName">
                      HP
                      <span>{prop!.pokemon.stats.find((s) => s.stat.name == 'hp').base_stat}</span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'hp').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'hp').base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'hp').base_stat < 150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>

                  <div className="stat-element">
                    <div className="statName">
                      Attack
                      <span>
                        {prop!.pokemon.stats.find((s) => s.stat.name == 'attack').base_stat}
                      </span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'attack').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'attack').base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'attack').base_stat <
                                150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>
                  <div className="stat-element">
                    <div className="statName">
                      Defense
                      <span>
                        {prop!.pokemon.stats.find((s) => s.stat.name == 'defense').base_stat}
                      </span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'defense').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'defense').base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'defense').base_stat <
                                150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>
                  <div className="stat-element">
                    <div className="statName">
                      SpA
                      <span>
                        {prop!.pokemon.stats.find((s) => s.stat.name == 'special-attack').base_stat}
                      </span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'special-attack').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'special-attack')
                            .base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'special-attack')
                                  .base_stat < 150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>
                  <div className="stat-element">
                    <div className="statName">
                      SpD
                      <span>
                        {
                          prop!.pokemon.stats.find((s) => s.stat.name == 'special-defense')
                            .base_stat
                        }
                      </span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'special-defense').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'special-defense')
                            .base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'special-defense')
                                  .base_stat < 150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>
                  <div className="stat-element">
                    <div className="statName">
                      Speed
                      <span>
                        {prop!.pokemon.stats.find((s) => s.stat.name == 'speed').base_stat}
                      </span>
                    </div>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${prop!.pokemon.stats.find((s) => s.stat.name == 'speed').base_stat}px`,
                        backgroundColor: `${
                          prop!.pokemon.stats.find((s) => s.stat.name == 'speed').base_stat < 100
                            ? '#B5CC18'
                            : prop!.pokemon.stats.find((s) => s.stat.name == 'speed').base_stat <
                                150
                              ? '#21BA45'
                              : '#00B5AD'
                        }`
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="pokemonFormsContainer">
                <div className="pokemonForms">
                  {prop!.species.varieties.length > 1 && (
                    <>
                      <div className="form-element">
                        <img
                          src={useShiny ? shinySprite[0] : sprites[0]}
                          alt=""
                        />
                      </div>
                      <div className="form-element">
                        <span>→</span>
                      </div>
                      <div className="form-element">
                        <img
                          src={
                            useShiny
                              ? varietyShinySprite[0]
                              : varietySprite[0]
                          }
                          alt=""
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ContextMenu
        items={['Copy data']}
        click={() => navigator.clipboard.writeText(JSON.stringify(prop))}
      />
    </>
  )
}

export default App
