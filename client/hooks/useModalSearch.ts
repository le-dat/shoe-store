import { create } from "zustand"

interface IProps {
  showModal: boolean
  setShowModal: (type: boolean) => void
}

const useModalSearch = create<IProps>((set, get) => ({
  showModal: false,
  setShowModal: (type) => set(() => ({ showModal: type })),
}))

export default useModalSearch
