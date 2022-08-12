class ConfirmDeletions {

    constructor(cells) {
        let msg = this.createMenssage(cells);    
    }

    createMenssage(cells) {
        
        let message = "Do you wish to delete ";
		
        if (cells.length > 1) {
            let qttStreams = 0;
            let qttUnits = 0;

            cells.forEach(cell => {
                if (cell.edge == true) {
                    qttStreams += 1;
                }
                else {
                    qttUnits += 1;
                }
            });

            if (qttUnits > 0 && qttStreams > 0) {
                message += "selected units and connecting streams";
            }
            else if (qttUnits > 0 && qttStreams == 0) {
                message += "selected units ";
            }
            else if (qttUnits == 0 && qttStreams > 0) {
                message += "selected streams ";
            }
        }
        else if (cells[0].edge == true) {
            message += " the stream ";

            if (cells[0].children.length > 0) {
                message += " " + cells[0].children[0].value;
            }
        }
        else if (cells[0].children != null) {
            message += " the unit ";

            if (cells[0].children.length > 0) {
                message += " " + cells[0].children[0].value;
            }
        }
        message += " ?";

        return message;
    }
}