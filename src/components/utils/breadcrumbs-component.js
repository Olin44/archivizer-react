import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import ArchiveIcon from '@material-ui/icons/Archive';

export default class BreadcrumbsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    <ArchiveIcon/>Archivizer
                </Link>
                {this.props.subSites.map((subSites) => {
                    return <Link color="inherit" href={subSites.href}>
                        {subSites.icon}{subSites.name}
                    </Link>
                })
                }
                <Typography color="textPrimary">{this.props.actualSiteIcon}{this.props.actualSiteName}</Typography>
            </Breadcrumbs>
        )
    }
}