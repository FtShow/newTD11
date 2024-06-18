import React, {memo} from 'react';
import {Button} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides, ButtonPropsVariantOverrides} from "@mui/material/Button/Button";

type ButtonMemoType = {
    title: string,
    callback: () => void,
    color?: any
    variant?: any
}
export const ButtonMemo: React.FC<ButtonMemoType> = memo(({title, callback, color, variant}) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={callback}
        >
            {title}
        </Button>
    );
})
