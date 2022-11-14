import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#",
    customClass
}){
    return(
        <div className="">
            <div className="flex justify-center mx-auto">
                <img 
                    alt=""
                    className={customClass}
                    src={require('../assets/images/danblab_logo.png')} />
            </div>
            {/* <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 cursor-default">
                {heading}
            </h2> */}
            <p className="text-center text-sm">
            {paragraph} {' '}
            <Link to={linkUrl}>
                {linkName ? 
                <Button variant='contained' color='error' size='small'>
                    {linkName}
                </Button>: ''}
            </Link>
            </p>
        </div>
    )
}