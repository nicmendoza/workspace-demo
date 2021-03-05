import React, { useState, useEffect, useRef} from 'react';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux'
import {
  addNote,
  removeNote,
  selectNotes,
  updateNote
} from '../features/boardSlice'


function Canvas() {

  const notes = useSelector(selectNotes)
  const dispatch = useDispatch()

  const ref = useRef(null)
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)


  const [offsetHeight, setOffsetHeight] = useState(0)
  const [offsetWidth, setOffsetWidth] = useState(0)

  const [inlineEditNote, setInlineEditNote] = useState(false)
  const [noteText, setNoteText] = useState('')


  // cycle through a series of "new note texts" for onboarding demo
  const newNoteTexts = [
    'Double click me on the canvas',
    'Or double click me on the table view 👈',
    'New Note'
   ]

  const [newNoteText, setNewNoteText] = useState(notes.length === 0 ? newNoteTexts[0] : newNoteTexts.slice(-1))

  function cycleNewNoteText() {
    const nextNoteText = newNoteTexts[newNoteTexts.indexOf(newNoteText) + 1]
    if (nextNoteText) {
      setNewNoteText(nextNoteText)
    }
  }

  useEffect(() => {
    // todo: handle resize
    function handleResize() {
      setHeight(ref.current.parentNode.clientHeight)
      setWidth(ref.current.parentNode.clientWidth)
      const rect = ref.current.getBoundingClientRect()
      setOffsetHeight(rect.top)
      setOffsetWidth(rect.left)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    
  }, [height, width])


  const handleDragEnd = (note, event) => {
    // push location changes back to store
    const { x, y } = event.currentTarget.attrs
    dispatch(updateNote({...note, x, y}))
  };

  function listenForEnterKeypress(e) {
    switch(e.key){
      case 'Enter':
        applyNoteUpdate();
        break;
      case 'Escape':
        clearNoteUpdate();
        break;
      default:
        // do nothing
    }
  }

  function applyNoteUpdate(){
    dispatch(updateNote({...inlineEditNote, text: noteText}))
    clearNoteUpdate();
  }

  function clearNoteUpdate(){
    setInlineEditNote(undefined)
    setNoteText('')
  }

  function stageHandleDblClick(event){
    let {layerX: x, layerY: y} = event.evt
    x -= 50
    y -= 50
    dispatch(addNote({x,y, text:newNoteText}))
    cycleNewNoteText()
  }

  return (
    <div ref={ref} className="background-grid">
      <Stage
        width={width} height={height}
      >
        <Layer
            onDblClick={stageHandleDblClick}
            onClick={clearNoteUpdate}
        >
           <Rect
            x={0} y={0} width={width} height={height}
          />
          {notes.length === 0 && (
            <Text
              x={0}
              y={height/2 - 100}
              width={width}
              align="center"
              text="Double click anywhere to add a note"
              fontSize={50}

            />
          )}
        </Layer>
        <Layer>
          {notes.map((note, i) => (
            <Group
              key={'note-' + i}
              x={note.x}
              y={note.y}
              draggable
              onDragEnd={handleDragEnd.bind(null, note)}
              onDblClick={()=>setInlineEditNote(note)}
            >
              <Rect
                width={100}
                height={100}
                fill="#ffeaa0"
                shadowBlur={2}
                stroke="#9a8945"
                strokeWidth={1}
                cornerRadius={[12, 0, 12, 0]}
              />
              <Text
                text={note.text}
                width={100}
                fontSize={12}
                align="left"
                padding={7}
                wrap="word"
              />
            </Group>
          ))}
        </Layer>
      </Stage>
      {inlineEditNote && (
        <form onSubmit={applyNoteUpdate}>
          <textarea
            defaultValue={inlineEditNote.text}
            onFocus={(e)=>e.target.select()}
            onChange={(e)=>setNoteText(e.target.value)}
            onKeyDown={listenForEnterKeypress}
            className="absolute"
            autoFocus
            style={{
              top: inlineEditNote.y + offsetHeight,
              left: inlineEditNote.x + offsetWidth,
              padding: '7px',
              paddingRight: '5px',
              fontSize: '11.5px',
              lineHeight: '12px',
              width: '100px',
              height: '100px',
              background: '#ffeaa0',
              borderRadius: '12px 0 12px 0',
              borderColor: '#9a8945',
              overflowWrap: 'break-word',
              boxShadow: '0 3px 7px black',
              overflow: 'hidden',
              resize: 'none'
            }}
          ></textarea>
        </form>
      )}
    </div>
  );
};

export default Canvas

