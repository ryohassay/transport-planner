const Footer = () => {
    const year = (new Date()).getFullYear();
    
    return (
        <div>
            <div id="footer-title">一括乗換検索</div>
            <div id="copy-right">&copy; {year} ryohassay</div>
        </div>
    );
}

export default Footer;
