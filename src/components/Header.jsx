import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-auto"
                    src={require('../assets/images/danblab_logo.png')} />
            </div>
            {/* <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 cursor-default">
                {heading}
            </h2> */}
            <p className="mt-2 text-center text-sm">
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