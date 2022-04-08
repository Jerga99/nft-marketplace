


import { FunctionComponent } from "react";
import NftItem from "../item";


const NftList: FunctionComponent = () => {
  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <NftItem />
      </div>
    </div>
  )
}

export default NftList;
