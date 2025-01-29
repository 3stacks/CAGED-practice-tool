import React from "react";

export default function FretNumbers({ fretCount }: { fretCount: number }) {
  return (
    <div className="w-full justify-between px-4 items-center text-center flex">
      {new Array(fretCount).fill(0).map((_, index) => {
        return (
          <React.Fragment key={index}>
            <span className="note text-black">{index}</span>
            {index === 0 && (
              <div className="h-[35px] lg:h-[50px] w-[5px] bg-black"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
