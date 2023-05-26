import {useState} from 'react';
import {Items} from './items';
import noImage from './assets/images/no-image.png';
import background from './assets/images/background.webp';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  return (
    <div className="App">
      <section className="mx-auto flex min-w-0 max-w-4xl flex-1 flex-col">
        <header>
          <div className="w-full mt-6">
            <img className="w-full h-full rounded-xl object-cover" src={background} alt="Landscape photograph by Tobias Tullius" />
          </div>
        </header>
        <div className="h-full">
          <div className="block h-full w-full">
            <div className="mt-6">
              <div name="category-11" className="pb-6 last:pb-0 px-4">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {
                    Items.map((_, i) => <Item key={i} position={_.id} image={_.image} description={_.description} onClick={() => { setIsOpen(true); setData(_)}} />)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DialogDetails isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </div>
  )
}

function Item ({position, image, description, onClick}) {
  return (
    <div className="cursor-pointer hover:shadow transition-shadow shadow-sm h-32 flex rounded-lg items-center border border-solid border-gray-200 bg-white p-2" onClick={() => onClick()}>
      <div className="w-28 shrink-0">
        <div className="relative w-full pb-[100%]">
          <div className="absolute">
            {
              image ? 
                <img alt="" className="w-full h-full object-cover rounded-md" src={image} /> : 
                <img alt="" className="w-full h-full object-cover rounded-md" src={noImage} />
            }
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start items-start flex-col pl-2 space-y-0.5 overflow-hidden">
        <p className="text-base font-bold ml-2 line-clamp-1">{`${position}º Premio!`}</p>
        <div className='m-2'>
          <p className="line-clamp-3 mt-1 text-sm leading-6 text-left">{description}</p>
        </div>
      </div>
    </div>
  )
}

function DialogDetails ({isOpen, onClose, data}) {

  if (data === undefined) return null

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-900 opacity-[0.85]" />
        <Dialog.Content 
          className="data-[state=open]:animate-contentShow z-20 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          onEscapeKeyDown={() => onClose()}
          onInteractOutside={() => onClose()}
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] text-2xl font-bold">
          {`${data.id}º Premio!`}
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            <img alt="" className="w-full h-full object-cover rounded-md" src={data.image || noImage} />
            <br />
            {data.description}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => onClose()}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}