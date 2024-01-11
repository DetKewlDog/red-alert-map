import { Sidebar as PrSidebar } from 'primereact/sidebar';

export function Sidebar(props) {
  return (
    <PrSidebar {...props} pt={{ root: { className: 'ui' }, header: { style: { display: 'none' } }, ...props.pt }}>
      {props.children}
    </PrSidebar>
  );
}