import IMXController from "./IMXController";

(async () => {
    let args = process.argv.slice(2);
    console.log(args);
    let controller = new IMXController();

    switch (args.shift()) {
        case "getCollection":
            await controller.getCollectionDetails();
            break;
        case "getMetadata":
            await controller.getMetadataSchema();
            break;
        case "metadataRepull":
            await controller.updateMetadataById(args);
            break;
        case "repullStatus":
            let requestId = args.shift();
            if(!requestId) {console.error("Request ID required."); process.exit(1)}
            await controller.metadataRefreshStatus(requestId);
            break;
        case "getAsset":
            let tokenId = args.shift();
            if(!tokenId) {console.error("Token ID required."); process.exit(1)}
            await controller.getAsset(tokenId);
            break;
        default:
            console.error("Unknown command");
    }

    process.exit(0);
})();
