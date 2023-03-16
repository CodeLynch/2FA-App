const AppFooter = () => {
    return (
        <footer className="d-flex justify-content-center align-items-end flex-row" style={{color:"grey", fontSize:".7rem"}}> 
                    <div className="d-flex justify-content-center">
                        This project was created to fulfill a requirement for CSIT335.
                    </div> 
                    <img className='m-1' src="2falogoALT.png" height={35} width={50} alt="grey logo"/>
        </footer>         
    )
}
export default AppFooter