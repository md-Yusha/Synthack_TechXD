// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract EduChain {
    struct AcademicRecord {
        string holderName;
        string institution;
        string degree;
        uint256 issueDate;
        bool isRevoked;
        string ipfsHash;
        string qrCodeHash;
        string[] additionalFields;
    }

    struct Institution {
        string name;
        string location;
        bool isVerified;
        uint256 verificationDate;
    }

    address public admin;
    mapping(address => AcademicRecord) private credentials;
    mapping(address => Institution) private institutions;
    mapping(address => bool) private authorizedIssuers;
    mapping(string => bool) private usedIpfsHashes;
    
    event CredentialIssued(
        address indexed holder,
        string ipfsHash,
        uint256 timestamp
    );
    
    event CredentialRevoked(
        address indexed holder,
        uint256 timestamp
    );
    
    event InstitutionRegistered(
        address indexed institutionAddress,
        string name,
        uint256 timestamp
    );
    
    event InstitutionVerified(
        address indexed institutionAddress,
        uint256 timestamp
    );
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Only authorized issuers can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    function registerInstitution(
        address institutionAddress,
        string memory _name,
        string memory _location
    ) external onlyAdmin {
        require(institutions[institutionAddress].verificationDate == 0, "Institution already registered");
        
        institutions[institutionAddress] = Institution({
            name: _name,
            location: _location,
            isVerified: false,
            verificationDate: 0
        });
        
        emit InstitutionRegistered(institutionAddress, _name, block.timestamp);
    }

    function verifyInstitution(address institutionAddress) external onlyAdmin {
        require(institutions[institutionAddress].verificationDate == 0, "Institution already verified");
        
        institutions[institutionAddress].isVerified = true;
        institutions[institutionAddress].verificationDate = block.timestamp;
        authorizedIssuers[institutionAddress] = true;
        
        emit InstitutionVerified(institutionAddress, block.timestamp);
    }

    function issueCredential(
        address holder,
        string memory _holderName,
        string memory _institution,
        string memory _degree,
        string memory _ipfsHash,
        string memory _qrCodeHash,
        string[] memory _additionalFields
    ) external onlyAuthorizedIssuer {
        require(credentials[holder].issueDate == 0, "Holder already has a credential");
        require(!usedIpfsHashes[_ipfsHash], "IPFS hash already used");
        require(institutions[msg.sender].isVerified, "Institution not verified");
        
        credentials[holder] = AcademicRecord({
            holderName: _holderName,
            institution: _institution,
            degree: _degree,
            issueDate: block.timestamp,
            isRevoked: false,
            ipfsHash: _ipfsHash,
            qrCodeHash: _qrCodeHash,
            additionalFields: _additionalFields
        });
        
        usedIpfsHashes[_ipfsHash] = true;
        
        emit CredentialIssued(holder, _ipfsHash, block.timestamp);
    }

    function verifyCredential(address holder) public view returns (
        string memory,
        string memory,
        string memory,
        uint256,
        bool,
        string memory,
        string memory,
        string[] memory
    ) {
        require(credentials[holder].issueDate != 0, "No credential found");
        AcademicRecord memory record = credentials[holder];
        return (
            record.holderName,
            record.institution,
            record.degree,
            record.issueDate,
            record.isRevoked,
            record.ipfsHash,
            record.qrCodeHash,
            record.additionalFields
        );
    }

    function revokeCredential(address holder) external onlyAuthorizedIssuer {
        require(!credentials[holder].isRevoked, "Credential already revoked");
        require(credentials[holder].issueDate != 0, "No credential found");
        
        credentials[holder].isRevoked = true;
        emit CredentialRevoked(holder, block.timestamp);
    }

    function getInstitutionInfo(address institutionAddress) public view returns (
        string memory,
        string memory,
        bool,
        uint256
    ) {
        Institution memory institution = institutions[institutionAddress];
        return (
            institution.name,
            institution.location,
            institution.isVerified,
            institution.verificationDate
        );
    }

    function addAuthorizedIssuer(address issuer) external onlyAdmin {
        authorizedIssuers[issuer] = true;
    }

    function removeAuthorizedIssuer(address issuer) external onlyAdmin {
        authorizedIssuers[issuer] = false;
    }
}
