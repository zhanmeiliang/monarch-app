/** 
 * Lightweight API for constructing phenopacket objects
 * 
 * Schema based on https://github.com/phenopackets/phenopacket-format
 * 
 * Secondarily based on python API, 
 * converted to ES6 which has similar syntax
 * 
 * @module phenopacket
 */

// Top level phenopacket container
class PhenoPacket {
    constructor({id = "", title = "", entities = [], variants = [],
                persons = [], organisms = [], phenotype_profile = [],
                diagnosis_profile = [], environment_profile = []}) {
        
        this.id = id;
        this.title = title;
        this.entities = entities;
        this.variants = variants;
        this.persons = persons;
        this.organisms = organisms;
        this.phenotype_profile = phenotype_profile;
        this.diagnosis_profile = diagnosis_profile;
        this.environment_profile = environment_profile;
    }
}
/**
 * An abstract class for anything that can be described
 *  as a boolean combination of ontology classes
 */
class ClassInstance {
    constructor({types = [], negated_types = [], description = ""}){
        
        this.types = types;
        this.negated_types = negated_types;
        this.description = description;
    }
}


class OntologyClass {
    constructor({class_id = "", label = ""}){
        
        this.id = class_id;
        this.label = label;
    }
}


class PropertyValue {
    constructor({property = "", filler = ""}){
        
        // Filler can be an object or string
        this.property = property;
        this.filler = filler;
    }
}

/*
 * An entity encompasses persons or non-human organisms,
 * variants, diseases, genes, cohorts, etc
 */
class Entity extends ClassInstance {

    //Holding off on implementing an enum class/check
    constructor({types = [], negated_types = [], description = "",
                entity_id = "", entity_label = "",
                entity_type = ""}) {

        super(types, negated_types, description);
        
        this.id = entity_id;
        this.label = entity_label;
        this.entity_type = entity_type;
    }
}

/**
 *  An association connects an entity (for example, disease,
 *  person or variant) with either another entity, or with
 *  some kind of descriptor (for example, phenotype).
 *
 *  All pieces of evidences are attached to associations
 */
class Association {

    constructor({entity = {}, evidence_list = []}) {
        
        this.entity = entity;
        this.evidence_list = evidence_list;
    }
}

/**
 *  An instance of a type of evidence that supports an association
 *  The evidence model follows the GO model
 */
class Evidence extends ClassInstance {

    constructor({types = [], negated_types = [], description = "",
                 supporting_entities = [], source = []}) {

        super(types, negated_types, description);
        
        this.supporting_entities = supporting_entities;
        this.source = source;
    }
}


class Publication {
    
    constructor({pub_id = "", title = ""}) {
        this.id = pub_id;
        this.title = title;
    }
}

class GenomicEntity extends Entity {

    constructor({types = [], negated_types = [],
                 description = "", entity_id = "",
                 entity_label = "", entity_type = "",
                 taxon = {}}) {

        super(types, negated_types, description,
              entity_id, entity_label, entity_type);
        
        this.taxon = taxon;
    }
}


class Variant extends GenomicEntity {

    constructor({types = [], negated_types = [],
                 description = "", entity_id = "",
                 entity_label = "", entity_type = "",
                 taxon = {}, description_hgvs = ""}) {

        super(types, negated_types, description,
              entity_id, entity_label, entity_type, taxon);
        
        this.description_hgvs = description_hgvs;
    }
}


class Organism extends Entity {

    constructor({types = [], negated_types = [],
                 description = "", entity_id = "",
                 entity_label = "", entity_type = "",
                 taxon = {}, strain = {},
                 sex = "", date_of_birth = ""}) {  
    
        super(types, negated_types, description,
              entity_id, entity_label, entity_type);
        
        this.taxon = taxon;
        this.strain = strain;
        this.sex = sex;
        this.date_of_birth = date_of_birth;
    }
}


class Person extends Organism {

    constructor({types = [], negated_types = [],
                 description = "", entity_id = "",
                 entity_label = "", entity_type = "",
                 taxon = {}, strain = {},
                 sex = "", date_of_birth = ""}) {

        super(types, negated_types, description,
              entity_id, entity_label, entity_type,
              taxon, straing, sex, date_of_birth);
    }
}


/**
 * An instance of a type of assay that was performed to determine
 *  the presence or extent of a phenotype
 */
class Assay extends ClassInstance {

    constructor({types = [], negated_types = [], description= ""}) {
        super(types, negated_types, description);
    }
}

/**
 * An abstract class that encompasses both DiseaseOccurrences and Phenotypes
 */
class Condition extends ClassInstance {

    constructor({types = [], negated_types = [], description = "",
                 has_location = "", onset = {},
                 offset = {}, severity = {}, environment = {} }) {
    
        super(types, negated_types, description);
        this.has_location = has_location;
        this.onset = onset;
        this.offset = offset;
        this.severity = severity;
        this.environment = environment;
    }
}


class ConditionSeverity extends ClassInstance {

    constructor({types = [], negated_types = [], description= ""}) {
        super(types, negated_types, description);
    }
}


class DiseaseStage extends Condition {

    constructor({types = [], negated_types = [], description = "",
                 has_location = "", onset = {},
                 offset = {}, severity = {},
                 environment= {} }) {
        
        super(types, negated_types, description, has_location,
              onset, offset, severity, environment);
    }
}


class DiseaseOccurrence extends Condition {

    constructor({types = [], negated_types = [], description = "",
                 has_location = "", onset = {},
                 offset = {}, severity = {},
                 environment= {}, stage = {}}) {

        super(types, negated_types, description, has_location,
              onset, offset, severity, environment);
        
        this.stage = stage;
    }
}


class DiseaseOccurrenceAssociation extends Association {

    constructor({ entity = {}, evidence_list = [], disease = {}}) {
        super(entity, evidence_list);
        
        this.disease = disease;
    } 
}


class Measurement extends ClassInstance {

    constructor({types = [], negated_types = [], description = "",
                 unit = {}, magnitude = ""}) {
        super(types, negated_types, description);
     
        this.unit = unit;
        this.magnitude = magnitude;
    }
}

/**
 * An instance of a particular site on or in an organism. This may be
 *  a whole organ, a cell type or even a subcellular location.
 *
 *  The type fields for this class are typically drawn from ontologies such
 *  as Uberon and CL.
 */
class OrganismalSite extends ClassInstance {
    
    constructor({types = [], negated_types = [], description= ""}) {
        super(types, negated_types, description);
    }
}

// An individual occurrence of a phenotype (a type of condition)
class Phenotype extends Condition {

    constructor({types = [], negated_types = [], description = "",
                has_location = "", onset = {},
                offset = {}, severity = {},
                environment= {} , measurements = []}) {

        super(types, negated_types, description, has_location,
              onset, offset, severity, environment);
        
        this.measurements = measurements;
    }
}


class PhenotypeAssociation extends Association {

    constructor({entity = {}, evidence_list = [],phenotype: {}}) {
        super().__init__(entity, evidence_list);
        
        this.phenotype = phenotype;
    }
}


class TemporalRegion extends ClassInstance {

    constructor({types = [], negated_types = [], description = "",
                 start_time = "", end_time = ""}) {
        super(types, negated_types, description);
        
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

if (typeof exports === 'object') {
    exports.PhenoPacket = PhenoPacket;
    exports.ClassInstance = ClassInstance;
    exports.OntologyClass = OntologyClass;
    exports.PropertyValue = PropertyValue;
    exports.Entity  = Entity; 
    exports.Association = Association;
    exports.Evidence  = Evidence; 
    exports.Publication = Publication;
    exports.GenomicEntity  = GenomicEntity; 
    exports.Variant  = Variant; 
    exports.Organism  = Organism; 
    exports.Person  = Person;
    exports.Assay  = Assay; 
    exports.Condition  = Condition; 
    exports.ConditionSeverity  = ConditionSeverity; 
    exports.DiseaseStage  = DiseaseStage; 
    exports.DiseaseOccurrence  = DiseaseOccurrence; 
    exports.DiseaseOccurrenceAssociation  = DiseaseOccurrenceAssociation; 
    exports.Measurement  = Measurement; 
    exports.OrganismalSite  = OrganismalSite; 
    exports.Phenotype  = Phenotype; 
    exports.PhenotypeAssociation  = PhenotypeAssociation; 
    exports.TemporalRegion  = TemporalRegion; 
}
if (typeof (loaderGlobals) === 'object') {
    loaderGlobals.PhenoPacket = PhenoPacket;
    loaderGlobals.ClassInstance = ClassInstance;
    loaderGlobals.OntologyClass = OntologyClass;
    loaderGlobals.PropertyValue = PropertyValue;
    loaderGlobals.Entity  = Entity; 
    loaderGlobals.Association = Association;
    loaderGlobals.Evidence  = Evidence;
    loaderGlobals.Publication = Publication;
    loaderGlobals.GenomicEntity  = GenomicEntity; 
    loaderGlobals.Variant  = Variant;
    loaderGlobals.Organism  = Organism; 
    loaderGlobals.Person  = Person; 
    loaderGlobals.Assay  = Assay; 
    loaderGlobals.Condition  = Condition; 
    loaderGlobals.ConditionSeverity  = ConditionSeverity; 
    loaderGlobals.DiseaseStage  = DiseaseStage; 
    loaderGlobals.DiseaseOccurrence  = DiseaseOccurrence; 
    loaderGlobals.DiseaseOccurrenceAssociation  = DiseaseOccurrenceAssociation; 
    loaderGlobals.Measurement  = Measurement; 
    loaderGlobals.OrganismalSite  = OrganismalSite; 
    loaderGlobals.Phenotype  = Phenotype; 
    loaderGlobals.PhenotypeAssociation  = PhenotypeAssociation; 
    loaderGlobals.TemporalRegion  = TemporalRegion; 
}
