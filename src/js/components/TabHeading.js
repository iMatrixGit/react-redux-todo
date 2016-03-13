export const TabHeading = ({
    title,
    onClick
    }) => {

    return (
        <a href="#"
           className="tab-heading"
           onClick={(e) => {
               e.preventDefault();
               onClick();
                }}>
            {title}
        </a>
    )
};