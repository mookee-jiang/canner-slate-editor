// @flow

import * as React from 'react';
import type {Change} from 'slate';
import type {nodeProps} from '../type';

import QuillIcons from 'quill-icons';
import FaTrashO from "react-icons/lib/fa/trash-o";
import styled from 'styled-components';
import EditTable from 'slate-edit-table';

type Props = nodeProps & {
  change: Change,
  editor: Object,
  readOnly: Boolean
};

const TableActiveContainer = styled.div`
  position: relative;
  border: 2px solid #ef6942;
`

export const Toolbar = styled.span`
  z-index: 1000;
  display: block;
  position: absolute;
  right: 10px;
  top: -40px;
  z-index: 100;
`;

export const ToolbarItem = styled.span`
  color: #fff;
  padding: 3px;
  margin: 3px;
  background-image: linear-gradient(180deg, #464646, #151515);
  font-size: 16px;
  border-radius: 5px;
  display: inline-flex;
  cursor: pointer;

  .__table-quill-class {
    margin: 2px
  }

  .__table-quill-fa-class {
    margin: 3px
  }

  .__table-quill-fill {
    fill: #FFF;
  }

  .__table-quill-transparent {
    fill: #CCC;
  }

  .__table-quill-row-transparent {
    fill: #151515;
  }

  .__table-quill-stroke {
    stroke: #FFF;
  }
`;

export default class Table extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.editTable = EditTable(props.tableOptions);
  }

  onRemove = () => {
    const { change } = this.props.editor;
    change(this.editTable.changes.removeTable)
  }

  onRemoveColumn = () => {
    const { change } = this.props.editor;
    change(this.editTable.changes.removeColumn)
  }

  onRemoveRow = () => {
    const { change } = this.props.editor;
    change(this.editTable.changes.removeRow)
  }

  onInsertColumn = () => {
    const { change } = this.props.editor;
    change(this.editTable.changes.insertColumn)
  }

  onInsertRow = () => {
    const { change } = this.props.editor;
    change(this.editTable.changes.insertRow)
  }

  render() {
    const {attributes, children, isSelected, readOnly} = this.props;

    if (!isSelected || readOnly) {
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    }

    return (
      <TableActiveContainer>
        <Toolbar>
          <ToolbarItem>
            <QuillIcons.TableDeleteColumns
              onMouseDown={e => e.preventDefault()}
              onClick={this.onRemoveColumn}
              className="__table-quill-class"
              fillClassName="__table-quill-fill"
              transparentClassName="__table-quill-transparent"/>
          </ToolbarItem>
          <ToolbarItem>
            <QuillIcons.TableDeleteRows
              onMouseDown={e => e.preventDefault()}
              onClick={this.onRemoveRow}
              className="__table-quill-class"
              strokeClassName="__table-quill-stroke"
              fillClassName="__table-quill-fill"
              transparentClassName="__table-quill-row-transparent"/>
          </ToolbarItem>
          <ToolbarItem>
            <QuillIcons.TableInsertColumns
              onMouseDown={e => e.preventDefault()}
              onClick={this.onInsertColumn}
              className="__table-quill-class"
              fillClassName="__table-quill-fill"
              transparentClassName="__table-quill-transparent"/>
          </ToolbarItem>
          <ToolbarItem>
            <QuillIcons.TableInsertRows
              onMouseDown={e => e.preventDefault()}
              onClick={this.onInsertRow}
              className="__table-quill-class"
              strokeClassName="__table-quill-stroke"
              fillClassName="__table-quill-fill"
              transparentClassName="__table-quill-row-transparent"/>
          </ToolbarItem>
          <ToolbarItem>
            <FaTrashO
              onMouseDown={e => e.preventDefault()}
              onClick={this.onRemove}
              className="__table-quill-fa-class"/>
          </ToolbarItem>
        </Toolbar>
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      </TableActiveContainer>
    );
  }
}
