import { Sidebar as PrSidebar } from 'primereact/sidebar';
import { Button } from './Button';

export function Sidebar(props) {
  const children = [
    (<span key={-1} className='sidebar-header'>
      <h2>{props.title}</h2>
      <Button onClick={(e) => props.onHide(e)} icon="pi pi-times" id='btn-close' />
    </span>),
    props.children
  ];
  return (
    <PrSidebar {...props} pt={{ header: { style: { display: 'none' } }, ...props.pt }} title=''>
      {children}
    </PrSidebar>
  );
}