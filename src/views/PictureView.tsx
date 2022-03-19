import { FC, useEffect, useRef, useState } from "react";

import img from '../assets/images/logo-diode.png'

const DOUBLE_CLICK_ZOOM = 3
const WHEEL_ZOOM_STEP = 5/4

const REAL_WIDTH = 750 // Longueur de l'image
const REAL_HEIGHT = 350 // Hauteur de l'image

interface BgPicture {
  zoom: number,
  x: number,
  y: number,
  loaded: boolean
}

const bgInitialState: BgPicture  = {
  zoom: 0,
  x: 0,
  y: 0,
  loaded: false
}


export const PictureView: FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Les dimension de la div contenant l'image
  const [[zoneW, zoneH], setZoneSize] = useState([0, 0])

  // Le zoom minimal de l'image
  const [minZoom, setMinZoom] = useState(1)

  // Les informations sur la position du l'image de fond
  const [bgPicture, setBgPicture] = useState<BgPicture>(bgInitialState)

  // Initialisation des valeurs
  useEffect(() => {
    if (container.current) {
      const zoneW = container.current.clientWidth
      const zoneH = container.current.clientHeight
      const rapportW = zoneW / REAL_WIDTH
      const rapportH = zoneH / REAL_HEIGHT
      const zoom = Math.max(rapportH, rapportW)
      setZoneSize([zoneW, zoneH])
      setMinZoom(zoom)
      setBgPicture({
        x: rapportH < rapportW ? 0 : - (REAL_WIDTH * zoom - zoneW) / 2,
        y: rapportH > rapportW ? 0 : - (REAL_HEIGHT * zoom - zoneH) / 2,
        zoom: Math.max(rapportH, rapportW),
        loaded: true
      })
    }
  }, [container])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    let nextZoom = 1
    if (e.deltaY > 0) {
      // ZOOM
      nextZoom = WHEEL_ZOOM_STEP
      
    } else if (e.deltaY < 0) {
      // UNZOOM
      nextZoom = 1 / WHEEL_ZOOM_STEP
    } else {
      return
    }

    const [mx, my] = mousePositionOnZone(e)
    setCheckBgPicture({
      ...bgPicture,
      x: (bgPicture.x - mx) * nextZoom + mx,
      y: (bgPicture.y - my) * nextZoom + my,
      zoom: bgPicture.zoom * nextZoom
    })
  }

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const [mx, my] = mousePositionOnZone(e)
    mousePositionOnBackground(mx, my)
    if (! isDragging) {
      return
    }
    handleMoveBackground(bgPicture.x + e.movementX, bgPicture.y + e.movementY)
  }

  const handleMoveBackground = (positionX: number, positionY: number) => {
    setCheckBgPicture({
      ...bgPicture,
      x: Math.max(Math.min(positionX, 0), zoneW - REAL_WIDTH * bgPicture.zoom),
      y: Math.max(Math.min(positionY, 0), zoneH - REAL_HEIGHT * bgPicture.zoom),
    })
  }

  const setCheckBgPicture = (bgPicture: BgPicture) => {
    const nextZoom = Math.max(bgPicture.zoom, minZoom)
    setBgPicture({
      ...bgPicture,
      x: Math.max(Math.min(bgPicture.x, 0), zoneW - REAL_WIDTH * nextZoom),
      y: Math.max(Math.min(bgPicture.y, 0), zoneH - REAL_HEIGHT * nextZoom),
      zoom: nextZoom
    })
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (bgPicture.zoom > minZoom) {
      setCheckBgPicture({
        ...bgPicture,
        zoom: minZoom
      })
      return
    }

    const [mx, my] = mousePositionOnZone(e)
    const nextZoom = DOUBLE_CLICK_ZOOM

    setCheckBgPicture({
      ...bgPicture,
      x: (bgPicture.x - mx) * nextZoom + zoneW / 2,
      y: (bgPicture.y - my) * nextZoom + zoneH / 2,
      zoom: bgPicture.zoom * nextZoom
    })
  }

  const mousePositionOnZone = (e: React.MouseEvent<HTMLDivElement>): [number,number] => {
    const rect = e.currentTarget.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  const mousePositionOnBackground = (mouseZoneX: number, mouseZoneY: number): [number, number] => {   
    let onBgX = Math.abs(bgPicture.x) + mouseZoneX
    let onBgY = Math.abs(bgPicture.y) + mouseZoneY
    return [onBgX, onBgY]
  }

  // Le style dynamique qui changera la taille de l'image et sa position
  const dynamicStyle: React.CSSProperties = {
    backgroundImage: `url(${img})`,
    backgroundSize: `${REAL_WIDTH * bgPicture.zoom}px ${REAL_HEIGHT * bgPicture.zoom}px`,
    backgroundPositionX: bgPicture.x,
    backgroundPositionY: bgPicture.y,
  }

  return <>
    <div
      onWheel={handleWheel}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleDrag}
      onDoubleClick={handleDoubleClick}
      style={{backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh', ...dynamicStyle}} ref={container}>
    </div>
  </>
}
