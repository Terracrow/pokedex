import { useContextMenu } from '../hooks/useContextMenu'

import '../assets/main.scss'

type Props = {
  items: Array<string>
  click: (item: string) => void
}

const ContextMenu = ({ items, click }: Props): JSX.Element | null => {
  const { anchorPoint, isShown } = useContextMenu()

  if (!isShown) {
    return null
  }

  return (
    <ul className="contextMenu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
      {items.map((item) => (
        <li key={item} onClick={() => click(item)}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export { ContextMenu }
