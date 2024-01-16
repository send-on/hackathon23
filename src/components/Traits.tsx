import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider';
import { Table, toaster } from 'evergreen-ui'


const Traits = () => {
  const { userTraits }:any = useContext(AppContext)

  
  return (
    <div>
      
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>trait</Table.TextHeaderCell>
          <Table.TextHeaderCell>Value</Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={1000}>
          {userTraits.map((trait) => (
            <Table.Row key={trait.id} isSelectable onSelect={() => toaster.success(trait.value)}>
              <Table.TextCell>{trait.key}</Table.TextCell>
              <Table.TextCell>{trait.value}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </div>
  )
}

export default Traits