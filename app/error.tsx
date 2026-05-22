"use client"
export default function Error({error,reset}:any) {

    return (
        <section className="rounded-lg p-6 w-full h-full flex flex-col justify-center items-center">
            <div 
                className="p-6 w-full h-full rounded-lg flex flex-col justify-content-center align-items-center"
                style={{border:"solid 1px",borderColor:"#c51791ff"}}>
                <span className="w-full text-lg font-bold text-center">
                    <h1 style={{ fontSize:"100pxs"}}>Ooops....</h1>
                </span>
                <span className="w-full text-lg font-bold text-center">
                    <h2>Looks like something went wrong.</h2>
                </span>
            </div>
        </section>
    )
}