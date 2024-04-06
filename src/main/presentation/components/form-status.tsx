import { Ellipsis } from './loadings'

export function FormStatus() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Ellipsis />
      <span className="text-primary-LIGHT font-bold uppercase tracking-wider">
        Error
      </span>
    </div>
  )
}
