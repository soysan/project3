import { Grid, makeStyles, Typography, Modal } from '@material-ui/core'
import React, { useReducer, useContext, useEffect, useState } from 'react';
// import { Reducer } from '../../../reducer/Reducer';
import { ProductsContext } from './items';
import ProductDetail from './modal/ProductDetail';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles({
  info: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
  }
});

export default function ProductItem(props) {
  const itemContext = useContext(ProductsContext[props.name])
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const ToggleHandler = () => {
    setOpen(!open);
  }

  // const ToggleHandler = () => {
    //   dispatch({ state: item, type: "OPEN_ITEM" });
    // }
    // const [item, dispatch] = useReducer(Reducer, itemContext)

  let effectString = '';
  switch (itemContext.type) {
    case 'ability':
      effectString = '/ click';
      break;
    case 'realEstate':
      effectString = '/ sec';
      break;
    default:
      effectString = '% / sec';
  }

  return (
    <>
      <Modal
        open={open}
        onClose={ToggleHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          position: "absolute",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: green[100],
          boxShadow: 24,
          p: 4,
        }}
      >
        <ProductDetail itemData={itemContext} />
      </Modal>
      <div className={classes.info} onClick={ToggleHandler}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography className={classes.title} variant="h1" gutterBottom>
              {itemContext.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {itemContext.price}
            </Typography>
            <Typography variant="h6" gutterBottom>
              +$ {itemContext.effect + effectString}
            </Typography>
          </Grid>
          <Typography variant="h5">count</Typography>
        </Grid>
      </div>
    </>
  )
}
