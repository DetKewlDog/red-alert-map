import { Sidebar as PrSidebar } from 'primereact/sidebar';
import { Button } from './Button';

interface SidebarProps extends React.ComponentProps<typeof PrSidebar> {
  headerClassName?: string;
}

export function Sidebar({ headerClassName = '', ...props } : SidebarProps) {
  const children = [
    (<span key={-1}
      className={`sidebar-header ${headerClassName}`}
    >
      <h2>{props.title}</h2>
      <Button onClick={() => props.onHide()} icon="pi pi-times" id='btn-close' />
    </span>),
    props.children
  ];
  return (
    <PrSidebar {...props} pt={{ header: { style: { display: 'none' } }, ...props.pt }} title=''>
      {children}
    </PrSidebar>
  );
}