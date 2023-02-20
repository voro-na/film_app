import {Link} from "react-router-dom";
import styles from './header.module.scss';

const navigation = [
    {
        title: 'HOME',
        path: '/'
    },
    {
        title: 'MOVIES',
        path: '/movies'
    },
    {
        title: 'TV SERIALS',
        path: '/serials'
    },
]

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Link to={'/'}>LOGO</Link>
            </div>
            <ul>
                {
                    navigation.map((temp, index) => (
                        <li key={index}>
                            <Link className={styles.wrapper_li} to={temp.path}>{temp.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Header